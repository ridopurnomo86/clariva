import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "./db";
import {
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
} from "./schema";

const normalizeVector = (vector: number[]) => {
  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
  if (magnitude === 0) return vector.map(() => 0);
  return vector.map((value) => value / magnitude);
};

async function main() {
  console.log("--- Seeding Database ---");

  const [engineering] = await db
    .insert(departments)
    .values({ name: "Engineering" })
    .onConflictDoNothing()
    .returning();

  const [sales] = await db
    .insert(departments)
    .values({ name: "Sales" })
    .onConflictDoNothing()
    .returning();

  const departmentRows = await db.select().from(departments);
  const engineeringDepartment =
    engineering ?? departmentRows.find((row) => row.name === "Engineering");
  const salesDepartment = sales ?? departmentRows.find((row) => row.name === "Sales");

  if (!engineeringDepartment || !salesDepartment) {
    throw new Error("Failed to ensure departments were seeded.");
  }

  const [devTemplate] = await db
    .insert(onboardingTemplates)
    .values({
      name: "Senior Developer Onboarding",
      description: "Technical onboarding template for senior engineers.",
    })
    .onConflictDoNothing()
    .returning();

  const [salesTemplate] = await db
    .insert(onboardingTemplates)
    .values({
      name: "Account Executive Onboarding",
      description: "Commercial onboarding template for sales hires.",
    })
    .onConflictDoNothing()
    .returning();

  const templateRows = await db.select().from(onboardingTemplates);
  const developerTemplate =
    devTemplate ?? templateRows.find((row) => row.name === "Senior Developer Onboarding");
  const accountExecTemplate =
    salesTemplate ?? templateRows.find((row) => row.name === "Account Executive Onboarding");

  if (!developerTemplate || !accountExecTemplate) {
    throw new Error("Failed to ensure onboarding templates were seeded.");
  }

  const existingDeveloperTemplateTask = await db
    .select()
    .from(templateTasks)
    .where(eq(templateTasks.templateId, developerTemplate.id))
    .limit(1);

  if (existingDeveloperTemplateTask.length === 0) {
    await db.insert(templateTasks).values([
      {
        templateId: developerTemplate.id,
        taskName: "Complete payroll form",
        taskType: "FORM_FILL",
        dueDayOffset: 1,
      },
      {
        templateId: developerTemplate.id,
        taskName: "Upload government ID",
        taskType: "DOC_UPLOAD",
        dueDayOffset: 1,
      },
      {
        templateId: developerTemplate.id,
        taskName: "Watch engineering culture video",
        taskType: "VIDEO_WATCH",
        dueDayOffset: 3,
      },
    ]);
  }

  const existingSalesTemplateTask = await db
    .select()
    .from(templateTasks)
    .where(eq(templateTasks.templateId, accountExecTemplate.id))
    .limit(1);

  if (existingSalesTemplateTask.length === 0) {
    await db.insert(templateTasks).values([
      {
        templateId: accountExecTemplate.id,
        taskName: "Sign sales handbook acknowledgement",
        taskType: "FORM_FILL",
        dueDayOffset: 1,
      },
      {
        templateId: accountExecTemplate.id,
        taskName: "Watch sales process overview",
        taskType: "VIDEO_WATCH",
        dueDayOffset: 2,
      },
    ]);
  }

  const [engineeringRole] = await db
    .insert(roles)
    .values({
      title: "Senior Software Engineer",
      departmentId: engineeringDepartment.id,
      baseTemplateId: developerTemplate.id,
    })
    .onConflictDoNothing()
    .returning();

  const [salesRole] = await db
    .insert(roles)
    .values({
      title: "Account Executive",
      departmentId: salesDepartment.id,
      baseTemplateId: accountExecTemplate.id,
    })
    .onConflictDoNothing()
    .returning();

  const roleRows = await db.select().from(roles);
  const developerRole =
    engineeringRole ?? roleRows.find((row) => row.title === "Senior Software Engineer");
  const accountExecutiveRole = salesRole ?? roleRows.find((row) => row.title === "Account Executive");

  if (!developerRole || !accountExecutiveRole) {
    throw new Error("Failed to ensure roles were seeded.");
  }

  const insertedUsers = await db
    .insert(users)
    .values([
      {
        email: "hr.admin@clariva.local",
        name: "HR Admin",
        passwordHash: "seeded-password-hash",
        roleType: "HR_ADMIN",
        status: "ACTIVE",
        roleId: developerRole.id,
      },
      {
        email: "new.hire@clariva.local",
        name: "New Hire",
        passwordHash: "seeded-password-hash",
        roleType: "NEW_HIRE",
        status: "PRE_BOARDING",
        roleId: developerRole.id,
      },
    ])
    .onConflictDoNothing()
    .returning();

  const allUsers =
    insertedUsers.length > 0 ? insertedUsers : await db.select().from(users).limit(2);

  console.log(`Handled ${allUsers.length} users`);

  const newHire = allUsers.find((user) => user.roleType === "NEW_HIRE");
  if (newHire) {
    const [instance] = await db
      .insert(employeeOnboardingInstances)
      .values({
        userId: newHire.id,
        templateId: developerRole.baseTemplateId,
        startDate: new Date().toISOString().slice(0, 10),
      })
      .onConflictDoNothing()
      .returning();

    const onboardingInstance =
      instance ??
      (
        await db
          .select()
          .from(employeeOnboardingInstances)
          .where(eq(employeeOnboardingInstances.userId, newHire.id))
          .limit(1)
      )[0];

    if (onboardingInstance) {
      const tasks = await db
        .select()
        .from(templateTasks)
        .where(eq(templateTasks.templateId, onboardingInstance.templateId));

      if (tasks.length > 0) {
        await db.insert(employeeTasks).values(
          tasks.map((task) => ({
            onboardingInstanceId: onboardingInstance.id,
            taskId: task.id,
            status: "PENDING" as const,
          })),
        );
      }
    }
  }

  const existingWelcome = await db.select().from(welcomeSequences).limit(1);
  if (existingWelcome.length === 0) {
    await db.insert(welcomeSequences).values([
      {
        roleId: developerRole.id,
        emailSubject: "Welcome to Clariva",
        emailBody: "We are excited to have you. Start by reviewing your Day 1 checklist.",
        delayDays: 0,
      },
      {
        roleId: developerRole.id,
        emailSubject: "Day 3 Check-in",
        emailBody: "Remember to finish your onboarding videos and documents.",
        delayDays: 3,
      },
      {
        roleId: accountExecutiveRole.id,
        emailSubject: "Welcome to the Sales Team",
        emailBody: "Your onboarding plan is ready. Please complete your first-day tasks.",
        delayDays: 0,
      },
    ]);
  }

  const existingPolicy = await db
    .select()
    .from(policyMetadata)
    .where(and(eq(policyMetadata.title, "Remote Work Policy"), eq(policyMetadata.version, "v1.0")))
    .limit(1);

  const remoteWorkPolicy =
    existingPolicy[0] ??
    (
      await db
        .insert(policyMetadata)
        .values({
          title: "Remote Work Policy",
          version: "v1.0",
          accessLevel: "NEW_HIRE",
        })
        .returning()
    )[0];

  const existingPolicyChunks = await db
    .select()
    .from(policyEmbeddings)
    .where(eq(policyEmbeddings.policyId, remoteWorkPolicy.id))
    .limit(1);

  if (existingPolicyChunks.length === 0) {
    await db.insert(policyEmbeddings).values([
      {
        policyId: remoteWorkPolicy.id,
        textChunk: "Employees may work remotely up to three days per week with manager approval.",
        vectorEmbedding: normalizeVector([0.91, 0.23, 0.4, 0.11]),
      },
      {
        policyId: remoteWorkPolicy.id,
        textChunk: "Core collaboration hours are 10:00 to 15:00 local time on business days.",
        vectorEmbedding: normalizeVector([0.89, 0.15, 0.35, 0.08]),
      },
    ]);
  }

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
      ])
      .onConflictDoNothing()
      .returning();

    console.log(`Handled ${insertedPosts.length} posts`);
  }

  console.log("--- Seeding Completed ---");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
