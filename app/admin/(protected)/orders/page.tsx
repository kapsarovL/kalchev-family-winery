import { db } from "@/lib/db";
import { orders, orderItems } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import OrderClient from "./order-client";

export default async function AdminOrdersPage() {
  if (!db) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <p className="text-deepBrown-100/50 font-inter">Database not available.</p>
      </div>
    );
  }

  try {
    const rows = await db.select().from(orders).orderBy(desc(orders.createdAt));

    const result = await Promise.all(
      rows.map(async (order) => {
        const items = await db!.select().from(orderItems).where(eq(orderItems.orderId, order.id));
        return { ...order, items };
      }),
    );

    return <OrderClient orders={result} />;
  } catch {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <p className="text-deepBrown-100/50 font-inter">Failed to load orders.</p>
      </div>
    );
  }
}
