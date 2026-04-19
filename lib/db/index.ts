import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  console.warn("[db] DATABASE_URL is not set — database features will be unavailable.");
}

const sql = neon(process.env.DATABASE_URL ?? "postgresql://placeholder");

export const db = drizzle(sql, { schema });
