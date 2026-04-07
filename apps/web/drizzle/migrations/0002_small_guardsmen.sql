CREATE TYPE "public"."document_verification_status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."employee_task_status" AS ENUM('PENDING', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "public"."policy_access_level" AS ENUM('NEW_HIRE', 'HR_ADMIN', 'EXECUTIVE');--> statement-breakpoint
CREATE TYPE "public"."task_type" AS ENUM('FORM_FILL', 'DOC_UPLOAD', 'VIDEO_WATCH');--> statement-breakpoint
CREATE TYPE "public"."user_role_type" AS ENUM('HR_ADMIN', 'NEW_HIRE');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('PRE_BOARDING', 'ACTIVE', 'OFFBOARDED');--> statement-breakpoint
CREATE TABLE "Chat_History" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"query" text NOT NULL,
	"aiResponse" text NOT NULL,
	"feedbackScore" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Department" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(120) NOT NULL,
	CONSTRAINT "Department_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "Document" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"fileType" varchar(100) NOT NULL,
	"s3Url" text NOT NULL,
	"verificationStatus" "document_verification_status" DEFAULT 'PENDING' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Employee_Onboarding_Instance" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"templateId" integer NOT NULL,
	"startDate" date NOT NULL,
	"currentProgressPct" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Employee_Task" (
	"id" serial PRIMARY KEY NOT NULL,
	"onboardingInstanceId" integer NOT NULL,
	"taskId" integer NOT NULL,
	"status" "employee_task_status" DEFAULT 'PENDING' NOT NULL,
	"completionTimestamp" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "Onboarding_Template" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(150) NOT NULL,
	"description" text,
	CONSTRAINT "Onboarding_Template_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "Policy_Embedding" (
	"id" serial PRIMARY KEY NOT NULL,
	"policyId" integer NOT NULL,
	"textChunk" text NOT NULL,
	"vectorEmbedding" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Policy_Metadata" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(240) NOT NULL,
	"version" varchar(32) NOT NULL,
	"accessLevel" "policy_access_level" DEFAULT 'NEW_HIRE' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Role" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(120) NOT NULL,
	"departmentId" integer NOT NULL,
	"baseTemplateId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Template_Task" (
	"id" serial PRIMARY KEY NOT NULL,
	"templateId" integer NOT NULL,
	"taskName" varchar(240) NOT NULL,
	"taskType" "task_type" NOT NULL,
	"dueDayOffset" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Welcome_Sequence" (
	"id" serial PRIMARY KEY NOT NULL,
	"roleId" integer NOT NULL,
	"emailSubject" varchar(240) NOT NULL,
	"emailBody" text NOT NULL,
	"delayDays" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_User_id_fk";
--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "passwordHash" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "roleType" "user_role_type" DEFAULT 'NEW_HIRE' NOT NULL;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "status" "user_status" DEFAULT 'PRE_BOARDING' NOT NULL;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "roleId" integer;--> statement-breakpoint
ALTER TABLE "Chat_History" ADD CONSTRAINT "Chat_History_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Employee_Onboarding_Instance" ADD CONSTRAINT "Employee_Onboarding_Instance_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Employee_Onboarding_Instance" ADD CONSTRAINT "Employee_Onboarding_Instance_templateId_Onboarding_Template_id_fk" FOREIGN KEY ("templateId") REFERENCES "public"."Onboarding_Template"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Employee_Task" ADD CONSTRAINT "Employee_Task_onboardingInstanceId_Employee_Onboarding_Instance_id_fk" FOREIGN KEY ("onboardingInstanceId") REFERENCES "public"."Employee_Onboarding_Instance"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Employee_Task" ADD CONSTRAINT "Employee_Task_taskId_Template_Task_id_fk" FOREIGN KEY ("taskId") REFERENCES "public"."Template_Task"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Policy_Embedding" ADD CONSTRAINT "Policy_Embedding_policyId_Policy_Metadata_id_fk" FOREIGN KEY ("policyId") REFERENCES "public"."Policy_Metadata"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Role" ADD CONSTRAINT "Role_departmentId_Department_id_fk" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Role" ADD CONSTRAINT "Role_baseTemplateId_Onboarding_Template_id_fk" FOREIGN KEY ("baseTemplateId") REFERENCES "public"."Onboarding_Template"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Template_Task" ADD CONSTRAINT "Template_Task_templateId_Onboarding_Template_id_fk" FOREIGN KEY ("templateId") REFERENCES "public"."Onboarding_Template"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Welcome_Sequence" ADD CONSTRAINT "Welcome_Sequence_roleId_Role_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_User_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_Role_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE restrict ON UPDATE no action;
