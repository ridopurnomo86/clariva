import { createServerFn } from "@tanstack/react-start";
import { db } from "drizzle/db";
import { posts } from "drizzle/schema";

export const getPosts = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await db.select().from(posts);
  } catch (error: any) {
    console.error("Database fetch failed (posts):", error?.message ?? error);
    throw new Error("Failed to fetch posts from database");
  }
});
