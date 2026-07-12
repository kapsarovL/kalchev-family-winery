import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders, orderItems } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { verifyAdminSession } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  if (!(await verifyAdminSession(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const database = db;
  if (!database) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }

  try {
    const email = request.nextUrl.searchParams.get("email");

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
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await verifyAdminSession(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const database = db;
  if (!database) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const [updated] = await database
      .update(orders)
      .set({ status, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}