"use server";

import { z } from "zod";
import { orders, orderItems, wineInventory } from "@/lib/db/schema";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  sendEmail,
  sendAdminNotification,
  orderNotificationHtml,
  orderConfirmationHtml,
  formatDate,
} from "@/lib/email";
import { headers } from "next/headers";
import { eq, sql } from "drizzle-orm";
import { parsePrice } from "@/lib/price";

const checkoutItemSchema = z.object({
  wineId: z.number(),
  wineName: z.string(),
  winePrice: z.string(),
  quantity: z.number().int().positive(),
});

const checkoutSchema = z.object({
  customerName: z.string().min(1, "Name is required").max(100),
  customerEmail: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required").max(30),
  addressLine1: z.string().min(1, "Address is required").max(200),
  addressLine2: z.string().max(200).optional(),
  city: z.string().min(1, "City is required").max(100),
  postalCode: z.string().min(1, "Postal code is required").max(20),
  country: z.string().min(1, "Country is required").max(100),
  deliveryNotes: z.string().max(500).optional(),
  items: z.array(checkoutItemSchema).min(1, "Cart is empty"),
});

export async function checkoutAction(_prevState: unknown, formData: FormData) {
  const rawHeaders = await headers();
  const rawIp = rawHeaders.get("x-forwarded-for");
  const ip = rawIp?.split(",")[0]?.trim() ?? "anonymous";
  const { allowed, retryAfterSecs } = await checkRateLimit(ip);
  if (!allowed) {
    return {
      success: false,
      orderId: null,
      errors: { _form: `Too many requests. Please try again in ${retryAfterSecs}s.` },
    };
  }

  const raw = Object.fromEntries(formData);

  let items: z.infer<typeof checkoutItemSchema>[] = [];
  try {
    items = JSON.parse((raw.items as string) ?? "[]");
  } catch {
    return { success: false, orderId: null, errors: { items: "Invalid cart data" } };
  }

  try {
    const data = checkoutSchema.parse({ ...raw, items });
    const total = data.items
      .reduce((sum, item) => sum + parsePrice(item.winePrice) * item.quantity, 0)
      .toFixed(2);

    if (process.env.DATABASE_URL) {
      const { db: stockDb } = await import("@/lib/db");
      if (stockDb) {
        for (const item of data.items) {
          const rows = await stockDb
            .select({ stock: wineInventory.stock })
            .from(wineInventory)
            .where(eq(wineInventory.wineId, item.wineId));
          const currentStock = rows[0]?.stock ?? 0;
          if (currentStock < item.quantity) {
            return {
              success: false,
              orderId: null,
              errors: {
                items: `"${item.wineName}" is out of stock or has insufficient quantity (available: ${currentStock}).`,
              },
            };
          }
        }
      }
    }

    let orderId: number | null = null;

    if (process.env.DATABASE_URL) {
      const { db } = await import("@/lib/db");
      if (db) {
        try {
          await db.transaction(async (tx) => {
            const [order] = await tx
              .insert(orders)
              .values({
                customerName: data.customerName,
                customerEmail: data.customerEmail,
                phone: data.phone,
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2 ?? null,
                city: data.city,
                postalCode: data.postalCode,
                country: data.country,
                deliveryNotes: data.deliveryNotes ?? null,
                total: `€${total}`,
              })
              .returning({ id: orders.id });

            if (order) {
              orderId = order.id;

              await tx.insert(orderItems).values(
                data.items.map((item) => ({
                  orderId: order.id,
                  wineId: item.wineId,
                  wineName: item.wineName,
                  winePrice: item.winePrice,
                  quantity: item.quantity,
                })),
              );

              for (const item of data.items) {
                await tx
                  .update(wineInventory)
                  .set({ stock: sql`GREATEST(${wineInventory.stock} - ${item.quantity}, 0)` })
                  .where(eq(wineInventory.wineId, item.wineId));
              }
            }
          });
        } catch {
          return {
            success: false,
            orderId: null,
            errors: { _form: "Failed to place order. Please try again." },
          };
        }
      }
    }

    if (orderId) {
      const addressParts = [
        data.addressLine1,
        data.addressLine2,
        data.city,
        data.postalCode,
        data.country,
      ].filter(Boolean);

      await sendAdminNotification(
        `New Order #${orderId} from ${data.customerName}`,
        orderNotificationHtml({
          orderId,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          phone: data.phone,
          address: addressParts.join("\n"),
          deliveryNotes: data.deliveryNotes ?? null,
          items: data.items,
          total: `€${total}`,
          date: formatDate(),
        }),
      );

      await sendEmail(
        data.customerEmail,
        `Order Confirmed — #${orderId}`,
        orderConfirmationHtml({
          orderId,
          customerName: data.customerName,
          items: data.items,
          total: `€${total}`,
          date: formatDate(),
        }),
      );
    }

    return { success: true, orderId, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        orderId: null,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            value?.join(", "),
          ]),
        ),
      };
    }

    return {
      success: false,
      orderId: null,
      errors: { _form: "An unexpected error occurred. Please try again." },
    };
  }
}
