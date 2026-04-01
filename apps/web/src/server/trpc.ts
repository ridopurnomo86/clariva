import { initTRPC } from "@trpc/server";
import { db } from "../../drizzle/db";
import { posts, users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const createTRPContext = () => ({});

type TRPCContext = Awaited<ReturnType<typeof createTRPContext>>;

const t = initTRPC.context<TRPCContext>().create();

export const appRouter = t.router({
  // Users
  users: t.procedure.query(async () => {
    return await db.select().from(users);
  }),

  user: t.procedure.input(z.number()).query(async ({ input }) => {
    const result = await db.select().from(users).where(eq(users.id, input));
    return result[0] ?? null;
  }),

  // Posts
  posts: t.procedure.query(async () => {
    return await db.select().from(posts);
  }),

  post: t.procedure.input(z.number()).query(async ({ input }) => {
    const result = await db.select().from(posts).where(eq(posts.id, input));
    return result[0] ?? null;
  }),

  createPost: t.procedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().optional(),
        authorId: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await db.insert(posts).values(input).returning();
      return result[0];
    }),
});

export const createCaller = (ctx: TRPCContext) =>
  t.createCallerFactory(appRouter)(ctx);

export type AppRouter = typeof appRouter;
