import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders, orderItems } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

async function requireAdmin(request: NextRequest): Promise<boolean> {
  const adminCookie = request.cookies.get("admin_authenticated")?.value;
  return adminCookie === "true";
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: NextRequest) {
  const database = db;
  if (!database) {
    return errorResponse("Database not available", 503);
  }

  if (!(await requireAdmin(request))) {
    return errorResponse("Unauthorized", 401);
  }

  const email = request.nextUrl.searchParams.get("email");

  try {
    if (email) {
      const rows = await database
        .select()
        .from(orders)
        .where(eq(orders.customerEmail, email))
        .orderBy(desc(orders.createdAt));

      const result = await Promise.all(
        rows.map(async (order) => {
          const items = await database.select().from(orderItems).where(eq(orderItems.orderId, order.id));
          return { ...order, items };
        }),
      );

      return NextResponse.json({ orders: result });
    }

    const rows = await database.select().from(orders).orderBy(desc(orders.createdAt));

    const result = await Promise.all(
      rows.map(async (order) => {
        const items = await database.select().from(orderItems).where(eq(orderItems.orderId, order.id));
        return { ...order, items };
      }),
    );

    return NextResponse.json({ orders: result });
  } catch {
    return errorResponse("Failed to fetch orders", 500);
  }
}

export async function PATCH(request: NextRequest) {
  const database = db;
  if (!database) {
    return errorResponse("Database not available", 503);
  }

  if (!(await requireAdmin(request))) {
    return errorResponse("Unauthorized", 401);
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return errorResponse("Missing id or status", 400);
    }

    const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return errorResponse("Invalid status", 400);
    }

    const [updated] = await database
      .update(orders)
      .set({ status, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();

    if (!updated) {
      return errorResponse("Order not found", 404);
    }

    return NextResponse.json({ order: updated });
  } catch {
    return errorResponse("Failed to update order", 500);
  }
}