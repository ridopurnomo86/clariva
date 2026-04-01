import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

const isProd = process.env.NODE_ENV === "production";

const databaseUrl = isProd
  ? process.env.PRODUCTION_DATABASE_URL
  : process.env.DEVELOPMENT_DATABASE_URL;

if (!databaseUrl) throw new Error("DATABASE_URL is not set");

// Prevent multiple connection pools in development due to HMR
type DrizzleDB = ReturnType<typeof drizzlePostgres<typeof schema>>;

const getDb = (): DrizzleDB => {
  if (isProd) {
    return drizzleNeon(neon(databaseUrl), { schema }) as any;
  }

  const globalRef = globalThis as unknown as { db: DrizzleDB | undefined };
  if (!globalRef.db) {
    globalRef.db = drizzlePostgres(postgres(databaseUrl), { schema });
  }
  return globalRef.db;
};

export const db = getDb();
