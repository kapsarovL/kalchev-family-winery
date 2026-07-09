import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import CalendarClient from "./calendar-client";

export default async function AdminCalendarPage() {
  if (!db) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <p className="text-deepBrown-100/50 font-inter">Database not available.</p>
      </div>
    );
  }

  try {
    const rows = await db.select().from(bookings).orderBy(desc(bookings.date));
    return <CalendarClient bookings={rows} />;
  } catch {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <p className="text-deepBrown-100/50 font-inter">Failed to load bookings.</p>
      </div>
    );
  }
}
