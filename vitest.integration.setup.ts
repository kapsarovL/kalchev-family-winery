import { beforeAll, afterAll, beforeEach } from "vitest";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as schema from "@/lib/db/schema";

let container: StartedPostgreSqlContainer;
export let testDb: ReturnType<typeof drizzle>;

beforeAll(async () => {
  container = await new PostgreSqlContainer("postgres:16-alpine").start();

  const client = postgres(container.getConnectionUri());
  testDb = drizzle(client, { schema });

  await migrate(testDb, { migrationsFolder: "./drizzle/migrations" });
}, 60000);

afterAll(async () => {
  await container.stop();
});

// Truncate between tests instead of recreating the container — cheaper
beforeEach(async () => {
  await testDb.execute(`
    DO $$ DECLARE
      r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' CASCADE';
      END LOOP;
    END $$;
  `);
});
