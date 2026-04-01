import "dotenv/config";
import { db } from "./db";
import { users, posts } from "./schema";

async function main() {
  console.log("--- Seeding Database ---");

  // Create Users (using onConflictDoNothing to allow multiple runs)
  const insertedUsers = await db
    .insert(users)
    .values([
      {
        email: "john.doe@example.com",
        name: "John Doe",
      },
      {
        email: "jane.smith@example.com",
        name: "Jane Smith",
      },
    ])
    .onConflictDoNothing()
    .returning();

  // If we didn't insert new users (because they exist), let's fetch them to link posts
  const allUsers = insertedUsers.length > 0 
    ? insertedUsers 
    : await db.select().from(users).limit(2);

  console.log(`Handled ${allUsers.length} users`);

  // Create Posts for the first user
  if (allUsers.length > 0) {
    const userId = allUsers[0].id;
    const insertedPosts = await db
      .insert(posts)
      .values([
        {
          title: "Hello World",
          content: "This is my first post using Drizzle ORM!",
          published: true,
          authorId: userId,
        },
        {
          title: "Drizzle is Awesome",
          content: "I really enjoy the type safety and developer experience.",
          published: true,
          authorId: userId,
        },
      ])
      .onConflictDoNothing() // Note: schema needs a unique constraint on title for this to trigger on conflict
      .returning();

    console.log(`Handled ${insertedPosts.length} new posts`);
  }

  console.log("--- Seeding Completed ---");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
