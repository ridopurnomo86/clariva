import { initTRPC } from "@trpc/server";
import { db } from "../../drizzle/db";
import {
  chatHistory,
  departments,
  employeeOnboardingInstances,
  employeeTasks,
  onboardingTemplates,
  policyEmbeddings,
  policyMetadata,
  posts,
  roles,
  templateTasks,
  users,
  welcomeSequences,
} from "../../drizzle/schema";
import { and, count, eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";

const createTRPContext = () => ({});

type TRPCContext = Awaited<ReturnType<typeof createTRPContext>>;

const t = initTRPC.context<TRPCContext>().create();

const accessLevelRank = {
  NEW_HIRE: 1,
  HR_ADMIN: 2,
  EXECUTIVE: 3,
} as const;

const normalizeVector = (vector: number[]) => {
  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
  if (magnitude === 0) return vector.map(() => 0);
  return vector.map((value) => value / magnitude);
};

const cosineSimilarity = (queryVector: number[], candidateVector: number[]) => {
  const sharedLength = Math.min(queryVector.length, candidateVector.length);
  if (sharedLength === 0) return 0;

  let dotProduct = 0;
  for (let index = 0; index < sharedLength; index += 1) {
    dotProduct += queryVector[index] * candidateVector[index];
  }

  return dotProduct;
};

const recomputeOnboardingProgress = async (onboardingInstanceId: number) => {
  const totals = await db
    .select({
      total: count(employeeTasks.id),
      completed: count(
        sql<number>`case when ${employeeTasks.status} = 'COMPLETED' then 1 end`,
      ),
    })
    .from(employeeTasks)
    .where(eq(employeeTasks.onboardingInstanceId, onboardingInstanceId));

  const totalTasks = totals[0]?.total ?? 0;
  const completedTasks = totals[0]?.completed ?? 0;
  const progressPct = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  await db
    .update(employeeOnboardingInstances)
    .set({ currentProgressPct: progressPct })
    .where(eq(employeeOnboardingInstances.id, onboardingInstanceId));

  return progressPct;
};

export const appRouter = t.router({
  departments: t.procedure.query(async () => {
    return await db.select().from(departments);
  }),

  roles: t.procedure.query(async () => {
    return await db.select().from(roles);
  }),

  onboardingTemplates: t.procedure.query(async () => {
    return await db.select().from(onboardingTemplates);
  }),

  createOnboardingTemplate: t.procedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        tasks: z
          .array(
            z.object({
              taskName: z.string().min(1),
              taskType: z.enum(["FORM_FILL", "DOC_UPLOAD", "VIDEO_WATCH"]),
              dueDayOffset: z.number().int().min(0),
            }),
          )
          .min(1),
      }),
    )
    .mutation(async ({ input }) => {
      return await db.transaction(async (tx) => {
        const [template] = await tx
          .insert(onboardingTemplates)
          .values({
            name: input.name,
            description: input.description ?? null,
          })
          .returning();

        const createdTasks = await tx
          .insert(templateTasks)
          .values(
            input.tasks.map((task) => ({
              templateId: template.id,
              taskName: task.taskName,
              taskType: task.taskType,
              dueDayOffset: task.dueDayOffset,
            })),
          )
          .returning();

        return {
          template,
          tasks: createdTasks,
        };
      });
    }),

  createDepartment: t.procedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const [department] = await db.insert(departments).values({ name: input.name }).returning();
      return department;
    }),

  createRole: t.procedure
    .input(
      z.object({
        title: z.string().min(1),
        departmentId: z.number().int(),
        baseTemplateId: z.number().int(),
      }),
    )
    .mutation(async ({ input }) => {
      const [role] = await db.insert(roles).values(input).returning();
      return role;
    }),

  createNewHireOnboarding: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().min(1),
        passwordHash: z.string().min(1),
        roleId: z.number().int(),
        startDate: z.string().date().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await db.transaction(async (tx) => {
        const roleRows = await tx.select().from(roles).where(eq(roles.id, input.roleId)).limit(1);
        const selectedRole = roleRows[0];

        if (!selectedRole) {
          throw new Error("Selected role does not exist.");
        }

        const [newUser] = await tx
          .insert(users)
          .values({
            email: input.email,
            name: input.name,
            passwordHash: input.passwordHash,
            roleType: "NEW_HIRE",
            status: "PRE_BOARDING",
            roleId: selectedRole.id,
          })
          .returning();

        const [instance] = await tx
          .insert(employeeOnboardingInstances)
          .values({
            userId: newUser.id,
            templateId: selectedRole.baseTemplateId,
            startDate: input.startDate ?? new Date().toISOString().slice(0, 10),
            currentProgressPct: 0,
          })
          .returning();

        const roleTemplateTasks = await tx
          .select()
          .from(templateTasks)
          .where(eq(templateTasks.templateId, selectedRole.baseTemplateId));

        if (roleTemplateTasks.length > 0) {
          await tx.insert(employeeTasks).values(
            roleTemplateTasks.map((task) => ({
              onboardingInstanceId: instance.id,
              taskId: task.id,
              status: "PENDING" as const,
            })),
          );
        }

        return {
          user: newUser,
          onboardingInstance: instance,
          instantiatedTaskCount: roleTemplateTasks.length,
        };
      });
    }),

  completeEmployeeTask: t.procedure
    .input(z.object({ employeeTaskId: z.number().int() }))
    .mutation(async ({ input }) => {
      const [updatedTask] = await db
        .update(employeeTasks)
        .set({
          status: "COMPLETED",
          completionTimestamp: new Date(),
        })
        .where(eq(employeeTasks.id, input.employeeTaskId))
        .returning();

      if (!updatedTask) {
        throw new Error("Employee task not found.");
      }

      const progressPct = await recomputeOnboardingProgress(updatedTask.onboardingInstanceId);

      return {
        task: updatedTask,
        currentProgressPct: progressPct,
      };
    }),

  hrCompletionLeaderboard: t.procedure.query(async () => {
    const rows = await db
      .select({
        userId: users.id,
        email: users.email,
        totalTasks: count(employeeTasks.id),
        completedTasks: count(sql<number>`case when ${employeeTasks.status} = 'COMPLETED' then 1 end`),
        progressPct: sql<number>`coalesce(round((100.0 * count(case when ${employeeTasks.status} = 'COMPLETED' then 1 end)) / nullif(count(${employeeTasks.id}), 0), 1), 0)`,
      })
      .from(users)
      .innerJoin(employeeOnboardingInstances, eq(users.id, employeeOnboardingInstances.userId))
      .innerJoin(employeeTasks, eq(employeeOnboardingInstances.id, employeeTasks.onboardingInstanceId))
      .groupBy(users.id, users.email)
      .orderBy(sql`progressPct desc`);

    return rows;
  }),

  pendingTasksForNewHire: t.procedure
    .input(z.object({ userId: z.number().int() }))
    .query(async ({ input }) => {
      const instanceRows = await db
        .select()
        .from(employeeOnboardingInstances)
        .where(eq(employeeOnboardingInstances.userId, input.userId))
        .limit(1);

      const instance = instanceRows[0];
      if (!instance) {
        return [];
      }

      return await db
        .select({
          employeeTaskId: employeeTasks.id,
          taskName: templateTasks.taskName,
          taskType: templateTasks.taskType,
          dueDayOffset: templateTasks.dueDayOffset,
          status: employeeTasks.status,
        })
        .from(employeeTasks)
        .innerJoin(templateTasks, eq(employeeTasks.taskId, templateTasks.id))
        .where(
          and(
            eq(employeeTasks.onboardingInstanceId, instance.id),
            eq(employeeTasks.status, "PENDING"),
          ),
        )
        .orderBy(templateTasks.dueDayOffset);
    }),

  runWelcomeSequenceDispatch: t.procedure
    .input(
      z.object({
        runDate: z.string().date().optional(),
      }),
    )
    .query(async ({ input }) => {
      const today = input.runDate ? new Date(input.runDate) : new Date();
      const targetDate = new Date(
        Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
      );

      const instances = await db
        .select({
          onboardingInstanceId: employeeOnboardingInstances.id,
          startDate: employeeOnboardingInstances.startDate,
          userId: users.id,
          userEmail: users.email,
          roleId: users.roleId,
        })
        .from(employeeOnboardingInstances)
        .innerJoin(users, eq(employeeOnboardingInstances.userId, users.id));

      const sequences = await db.select().from(welcomeSequences);
      const sequenceMap = new Map<string, (typeof sequences)[number]>();

      for (const sequence of sequences) {
        sequenceMap.set(`${sequence.roleId}:${sequence.delayDays}`, sequence);
      }

      const queuedEmails: Array<{
        onboardingInstanceId: number;
        userId: number;
        to: string;
        subject: string;
        body: string;
        delayDays: number;
      }> = [];

      for (const instance of instances) {
        const start = new Date(`${instance.startDate}T00:00:00.000Z`);
        const diffMs = targetDate.getTime() - start.getTime();
        const daysSinceStart = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (daysSinceStart < 0) continue;

        const sequence = sequenceMap.get(`${instance.roleId}:${daysSinceStart}`);
        if (!sequence) continue;

        queuedEmails.push({
          onboardingInstanceId: instance.onboardingInstanceId,
          userId: instance.userId,
          to: instance.userEmail,
          subject: sequence.emailSubject,
          body: sequence.emailBody,
          delayDays: sequence.delayDays,
        });
      }

      return {
        runDate: targetDate.toISOString().slice(0, 10),
        dispatchedCount: queuedEmails.length,
        queuedEmails,
      };
    }),

  createPolicy: t.procedure
    .input(
      z.object({
        title: z.string().min(1),
        version: z.string().min(1),
        accessLevel: z.enum(["NEW_HIRE", "HR_ADMIN", "EXECUTIVE"]),
        chunks: z
          .array(
            z.object({
              textChunk: z.string().min(1),
              vectorEmbedding: z.array(z.number()),
            }),
          )
          .min(1),
      }),
    )
    .mutation(async ({ input }) => {
      return await db.transaction(async (tx) => {
        const [policy] = await tx
          .insert(policyMetadata)
          .values({
            title: input.title,
            version: input.version,
            accessLevel: input.accessLevel,
          })
          .returning();

        const createdChunks = await tx
          .insert(policyEmbeddings)
          .values(
            input.chunks.map((chunk) => ({
              policyId: policy.id,
              textChunk: chunk.textChunk,
              vectorEmbedding: normalizeVector(chunk.vectorEmbedding),
            })),
          )
          .returning();

        return {
          policy,
          chunks: createdChunks,
        };
      });
    }),

  askPolicyQuestion: t.procedure
    .input(
      z.object({
        userId: z.number().int(),
        query: z.string().min(3),
        queryEmbedding: z.array(z.number()).min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const userRows = await db.select().from(users).where(eq(users.id, input.userId)).limit(1);
      const user = userRows[0];

      if (!user) {
        throw new Error("User not found.");
      }

      const userRank = accessLevelRank[user.roleType];
      const allowedAccessLevels = Object.entries(accessLevelRank)
        .filter(([, rank]) => rank <= userRank)
        .map(([accessLevel]) => accessLevel as keyof typeof accessLevelRank);

      const embeddings = await db
        .select({
          chunkId: policyEmbeddings.id,
          policyId: policyMetadata.id,
          policyTitle: policyMetadata.title,
          accessLevel: policyMetadata.accessLevel,
          textChunk: policyEmbeddings.textChunk,
          vectorEmbedding: policyEmbeddings.vectorEmbedding,
        })
        .from(policyEmbeddings)
        .innerJoin(policyMetadata, eq(policyEmbeddings.policyId, policyMetadata.id))
        .where(inArray(policyMetadata.accessLevel, allowedAccessLevels));

      const normalizedQuery = normalizeVector(input.queryEmbedding);
      const ranked = embeddings
        .map((chunk) => {
          const vector = Array.isArray(chunk.vectorEmbedding)
            ? chunk.vectorEmbedding
                .map((value) => (typeof value === "number" ? value : Number(value)))
                .filter((value) => Number.isFinite(value))
            : [];

          return {
            ...chunk,
            score: cosineSimilarity(normalizedQuery, vector),
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      const answer =
        ranked.length === 0
          ? "I could not find relevant policy context for this question."
          : `Based on policy excerpts, here is the best answer:\n${ranked
              .map((item, index) => `${index + 1}. (${item.policyTitle}) ${item.textChunk}`)
              .join("\n")}`;

      const [chat] = await db
        .insert(chatHistory)
        .values({
          userId: input.userId,
          query: input.query,
          aiResponse: answer,
        })
        .returning();

      return {
        chatId: chat.id,
        answer,
        sources: ranked.map((item) => ({
          chunkId: item.chunkId,
          policyId: item.policyId,
          policyTitle: item.policyTitle,
          accessLevel: item.accessLevel,
          score: Number(item.score.toFixed(4)),
          textChunk: item.textChunk,
        })),
      };
    }),

  submitChatFeedback: t.procedure
    .input(
      z.object({
        chatId: z.number().int(),
        feedbackScore: z.number().int().min(1).max(5),
      }),
    )
    .mutation(async ({ input }) => {
      const [updated] = await db
        .update(chatHistory)
        .set({ feedbackScore: input.feedbackScore })
        .where(eq(chatHistory.id, input.chatId))
        .returning();

      if (!updated) {
        throw new Error("Chat history record not found.");
      }

      return updated;
    }),

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
