"use server";

import { wineInventory } from "@/lib/db/schema";
import { WineStockStatus } from "@/types/wine";
import { eq } from "drizzle-orm";

export async function getStockStatus(wineId: number): Promise<WineStockStatus> {
  if (!process.env.DATABASE_URL) return "in-stock";
  const { db } = await import("@/lib/db");
  if (!db) return "in-stock";
  try {
    const [row] = await db
      .select()
      .from(wineInventory)
      .where(eq(wineInventory.wineId, wineId))
      .limit(1);
    if (!row) return "in-stock";
    if (row.stock === 0) return "pre-order";
    if (row.stock <= 10) return "limited";
    return "in-stock";
  } catch {
    return "in-stock";
  }
}

export async function getAllStockStatuses(): Promise<Record<number, WineStockStatus>> {
  if (!process.env.DATABASE_URL) return {};
  const { db } = await import("@/lib/db");
  if (!db) return {};
  try {
    const rows = await db.select().from(wineInventory);
    return Object.fromEntries(
      rows.map((r) => [
        r.wineId,
        r.stock === 0 ? "pre-order" : r.stock <= 10 ? "limited" : "in-stock",
      ]),
    );
  } catch {
    return {};
  }
}
