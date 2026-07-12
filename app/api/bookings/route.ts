import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";

async function requireAdmin(request: NextRequest): Promise<boolean> {
  const adminCookie = request.cookies.get("admin_authenticated")?.value;
  return adminCookie === "true";
}

export async function GET(request: NextRequest) {
  const database = db;
  if (!database) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }

  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const status = searchParams.get("status");

    const conditions = [];
    if (date) conditions.push(eq(bookings.date, date));
    if (status) conditions.push(eq(bookings.status, status));

    const result =
      conditions.length > 0
        ? await database
            .select()
            .from(bookings)
            .where(and(...conditions))
            .orderBy(desc(bookings.date), bookings.time)
        : await database.select().from(bookings).orderBy(desc(bookings.date), bookings.time);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const database = db;
  if (!database) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { name, email, phone, date, time, partySize, type, notes } = body;

    if (!name || !email || !phone || !date || !time || !partySize) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await database
      .insert(bookings)
      .values({ name, email, phone, date, time, partySize, type: type ?? "tasting", notes })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const database = db;
  if (!database) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }

  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing booking id" }, { status: 400 });
    }

    const allowed = [
      "status",
      "name",
      "email",
      "phone",
      "date",
      "time",
      "partySize",
      "type",
      "notes",
    ];
    const safeUpdates: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in updates) {
        safeUpdates[key] = updates[key];
      }
    }

    if (Object.keys(safeUpdates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const result = await database
      .update(bookings)
      .set(safeUpdates)
      .where(eq(bookings.id, id))
      .returning();

    return NextResponse.json(result[0]);
  } catch {
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}