"use server";

import { wineInventory } from "@/lib/db/schema";
import type { WineStockStatus } from "@/types/wine";

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
