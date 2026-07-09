import { db } from "@/lib/db";
import { orders, orderItems, bookings } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import DashboardClient from "./dashboard-client";

export default async function AdminDashboardPage() {
  if (!db) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <p className="text-deepBrown-100/50 font-inter">Database not available.</p>
      </div>
    );
  }

  try {
    const orderRows = await db.select().from(orders).orderBy(desc(orders.createdAt));
    const ordersWithItems = await Promise.all(
      orderRows.map(async (order) => {
        const items = await db!.select().from(orderItems).where(eq(orderItems.orderId, order.id));
        return { ...order, items };
      }),
    );

    const bookingRows = await db.select().from(bookings).orderBy(desc(bookings.date));

    return <DashboardClient orders={ordersWithItems} bookings={bookingRows} />;
  } catch {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <p className="text-deepBrown-100/50 font-inter">Failed to load data.</p>
      </div>
    );
  }
}
