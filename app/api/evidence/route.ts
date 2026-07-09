import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookingEvidence } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  if (!db) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get("booking_id");

    if (!bookingId) {
      return NextResponse.json({ error: "booking_id is required" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(bookingEvidence)
      .where(eq(bookingEvidence.bookingId, Number(bookingId)))
      .orderBy(desc(bookingEvidence.createdAt));

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to fetch evidence" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!db) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { bookingId, type, description, imageUrl } = body;

    if (!bookingId || !description) {
      return NextResponse.json(
        { error: "bookingId and description are required" },
        { status: 400 },
      );
    }

    const result = await db
      .insert(bookingEvidence)
      .values({ bookingId, type: type ?? "note", description, imageUrl })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create evidence" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!db) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await db.delete(bookingEvidence).where(eq(bookingEvidence.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete evidence" }, { status: 500 });
  }
}
