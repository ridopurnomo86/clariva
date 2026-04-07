import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoleTypeEnum = pgEnum("user_role_type", ["HR_ADMIN", "NEW_HIRE"]);
export const userStatusEnum = pgEnum("user_status", [
  "PRE_BOARDING",
  "ACTIVE",
  "OFFBOARDED",
]);
export const taskTypeEnum = pgEnum("task_type", ["FORM_FILL", "DOC_UPLOAD", "VIDEO_WATCH"]);
export const employeeTaskStatusEnum = pgEnum("employee_task_status", ["PENDING", "COMPLETED"]);
export const documentVerificationStatusEnum = pgEnum("document_verification_status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const policyAccessLevelEnum = pgEnum("policy_access_level", [
  "NEW_HIRE",
  "HR_ADMIN",
  "EXECUTIVE",
]);

export const departments = pgTable("Department", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull().unique(),
});

export const onboardingTemplates = pgTable("Onboarding_Template", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull().unique(),
  description: text("description"),
});

export const roles = pgTable("Role", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 120 }).notNull(),
  departmentId: integer("departmentId")
    .notNull()
    .references(() => departments.id, { onDelete: "restrict" }),
  baseTemplateId: integer("baseTemplateId")
    .notNull()
    .references(() => onboardingTemplates.id, { onDelete: "restrict" }),
});

export const users = pgTable("User", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: text("name"),
  passwordHash: text("passwordHash").notNull().default(""),
  roleType: userRoleTypeEnum("roleType").notNull().default("NEW_HIRE"),
  status: userStatusEnum("status").notNull().default("PRE_BOARDING"),
  roleId: integer("roleId").references(() => roles.id, { onDelete: "restrict" }),
});

export const templateTasks = pgTable("Template_Task", {
  id: serial("id").primaryKey(),
  templateId: integer("templateId")
    .notNull()
    .references(() => onboardingTemplates.id, { onDelete: "cascade" }),
  taskName: varchar("taskName", { length: 240 }).notNull(),
  taskType: taskTypeEnum("taskType").notNull(),
  dueDayOffset: integer("dueDayOffset").notNull().default(0),
});

export const employeeOnboardingInstances = pgTable("Employee_Onboarding_Instance", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  templateId: integer("templateId")
    .notNull()
    .references(() => onboardingTemplates.id, { onDelete: "restrict" }),
  startDate: date("startDate").notNull(),
  currentProgressPct: integer("currentProgressPct").notNull().default(0),
});

export const employeeTasks = pgTable("Employee_Task", {
  id: serial("id").primaryKey(),
  onboardingInstanceId: integer("onboardingInstanceId")
    .notNull()
    .references(() => employeeOnboardingInstances.id, { onDelete: "cascade" }),
  taskId: integer("taskId")
    .notNull()
    .references(() => templateTasks.id, { onDelete: "restrict" }),
  status: employeeTaskStatusEnum("status").notNull().default("PENDING"),
  completionTimestamp: timestamp("completionTimestamp", { withTimezone: true }),
});

export const documents = pgTable("Document", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  fileType: varchar("fileType", { length: 100 }).notNull(),
  s3Url: text("s3Url").notNull(),
  verificationStatus: documentVerificationStatusEnum("verificationStatus")
    .notNull()
    .default("PENDING"),
});

export const welcomeSequences = pgTable("Welcome_Sequence", {
  id: serial("id").primaryKey(),
  roleId: integer("roleId")
    .notNull()
    .references(() => roles.id, { onDelete: "cascade" }),
  emailSubject: varchar("emailSubject", { length: 240 }).notNull(),
  emailBody: text("emailBody").notNull(),
  delayDays: integer("delayDays").notNull().default(0),
});

export const policyMetadata = pgTable("Policy_Metadata", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 240 }).notNull(),
  version: varchar("version", { length: 32 }).notNull(),
  accessLevel: policyAccessLevelEnum("accessLevel").notNull().default("NEW_HIRE"),
});

export const policyEmbeddings = pgTable("Policy_Embedding", {
  id: serial("id").primaryKey(),
  policyId: integer("policyId")
    .notNull()
    .references(() => policyMetadata.id, { onDelete: "cascade" }),
  textChunk: text("textChunk").notNull(),
  vectorEmbedding: jsonb("vectorEmbedding").$type<number[]>().notNull(),
});

export const chatHistory = pgTable("Chat_History", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  query: text("query").notNull(),
  aiResponse: text("aiResponse").notNull(),
  feedbackScore: integer("feedbackScore"),
  createdAt: timestamp("createdAt", { withTimezone: true }).notNull().defaultNow(),
});

export const posts = pgTable("Post", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  published: boolean("published").notNull().default(false),
  authorId: integer("authorId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const departmentsRelations = relations(departments, ({ many }) => ({
  roles: many(roles),
}));

export const templatesRelations = relations(onboardingTemplates, ({ many }) => ({
  roles: many(roles),
  tasks: many(templateTasks),
  instances: many(employeeOnboardingInstances),
}));

export const rolesRelations = relations(roles, ({ one, many }) => ({
  department: one(departments, {
    fields: [roles.departmentId],
    references: [departments.id],
  }),
  baseTemplate: one(onboardingTemplates, {
    fields: [roles.baseTemplateId],
    references: [onboardingTemplates.id],
  }),
  users: many(users),
  welcomeSequences: many(welcomeSequences),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  posts: many(posts),
  onboardingInstances: many(employeeOnboardingInstances),
  documents: many(documents),
  chats: many(chatHistory),
}));

export const templateTasksRelations = relations(templateTasks, ({ one, many }) => ({
  template: one(onboardingTemplates, {
    fields: [templateTasks.templateId],
    references: [onboardingTemplates.id],
  }),
  employeeTasks: many(employeeTasks),
}));

export const onboardingInstancesRelations = relations(
  employeeOnboardingInstances,
  ({ one, many }) => ({
    user: one(users, {
      fields: [employeeOnboardingInstances.userId],
      references: [users.id],
    }),
    template: one(onboardingTemplates, {
      fields: [employeeOnboardingInstances.templateId],
      references: [onboardingTemplates.id],
    }),
    tasks: many(employeeTasks),
  }),
);

export const employeeTasksRelations = relations(employeeTasks, ({ one }) => ({
  onboardingInstance: one(employeeOnboardingInstances, {
    fields: [employeeTasks.onboardingInstanceId],
    references: [employeeOnboardingInstances.id],
  }),
  templateTask: one(templateTasks, {
    fields: [employeeTasks.taskId],
    references: [templateTasks.id],
  }),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  user: one(users, {
    fields: [documents.userId],
    references: [users.id],
  }),
}));

export const welcomeSequencesRelations = relations(welcomeSequences, ({ one }) => ({
  role: one(roles, {
    fields: [welcomeSequences.roleId],
    references: [roles.id],
  }),
}));

export const policyMetadataRelations = relations(policyMetadata, ({ many }) => ({
  chunks: many(policyEmbeddings),
}));

export const policyEmbeddingsRelations = relations(policyEmbeddings, ({ one }) => ({
  policy: one(policyMetadata, {
    fields: [policyEmbeddings.policyId],
    references: [policyMetadata.id],
  }),
}));

export const chatHistoryRelations = relations(chatHistory, ({ one }) => ({
  user: one(users, {
    fields: [chatHistory.userId],
    references: [users.id],
  }),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));

export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;
export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;
export type OnboardingTemplate = typeof onboardingTemplates.$inferSelect;
export type NewOnboardingTemplate = typeof onboardingTemplates.$inferInsert;
export type TemplateTask = typeof templateTasks.$inferSelect;
export type NewTemplateTask = typeof templateTasks.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type EmployeeOnboardingInstance = typeof employeeOnboardingInstances.$inferSelect;
export type NewEmployeeOnboardingInstance = typeof employeeOnboardingInstances.$inferInsert;
export type EmployeeTask = typeof employeeTasks.$inferSelect;
export type NewEmployeeTask = typeof employeeTasks.$inferInsert;
export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;
export type WelcomeSequence = typeof welcomeSequences.$inferSelect;
export type NewWelcomeSequence = typeof welcomeSequences.$inferInsert;
export type PolicyMetadata = typeof policyMetadata.$inferSelect;
export type NewPolicyMetadata = typeof policyMetadata.$inferInsert;
export type PolicyEmbedding = typeof policyEmbeddings.$inferSelect;
export type NewPolicyEmbedding = typeof policyEmbeddings.$inferInsert;
export type ChatHistory = typeof chatHistory.$inferSelect;
export type NewChatHistory = typeof chatHistory.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
