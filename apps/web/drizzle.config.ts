import { defineConfig } from "drizzle-kit";

const databaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_DATABASE_URL
    : process.env.DEVELOPMENT_DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is not set");

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
