# Implementation Plan
### Automated Employee Onboarding System

---

## Table of Contents

- [1. Core Database Schema](#1-core-database-schema-relational)
  - [A. Organizational & Identity](#a-organizational--identity-the-foundation)
  - [B. The Onboarding Engine](#b-the-onboarding-engine-checklists--automation)
  - [C. Document Collection & Communication](#c-document-collection--communication)
- [2. AI FAQ Model](#2-ai-faq-model-vector--metadata)
- [3. System Data Flow](#3-system-data-flow)
- [4. Feature Implementation Logic](#4-feature-implementation-logic)
  - [A. Welcome Sequence Trigger](#a-welcome-sequence-email-trigger)
  - [B. Role-Based Dashboard](#b-role-based-dashboard)
  - [C. AI Chatbot (RAG)](#c-ai-chatbot--retrieval-augmented-generation-rag)

---

## 1. Core Database Schema (Relational)

To create a truly automated system, the data model must handle not just static information, but **state** (task progress) and **triggers** (time-based emails). The schema below covers all core features: user management, role-based onboarding flows, document collection, and communications.

---

### A. Organizational & Identity (The Foundation)

These tables form the foundation of the system — defining who users are and what roles they belong to.

| Table | Fields |
|-------|--------|
| `Departments` | `id`, `name` *(e.g., Engineering, Sales)* |
| `Roles` | `id`, `title`, `department_id`, `base_template_id` — links a job title to a specific onboarding flow |
| `Users` | `id`, `email`, `password_hash`, `role_type` *(HR_ADMIN or NEW_HIRE)*, `status` *(pre-boarding, active, offboarded)* |

---

### B. The Onboarding Engine (Checklists & Automation)

This set of tables powers the automated checklist system, tracking individual task completion per employee.

| Table | Fields |
|-------|--------|
| `Onboarding_Templates` | `id`, `name`, `description` *(e.g., "Senior Dev Onboarding")* |
| `Template_Tasks` | `id`, `template_id`, `task_name`, `task_type` *(form_fill, doc_upload, video_watch)*, `due_day_offset` *(e.g., Day 1, Day 5)* |
| `Employee_Onboarding_Instance` | `id`, `user_id`, `template_id`, `start_date`, `current_progress_pct` |
| `Employee_Tasks` | `id`, `onboarding_instance_id`, `task_id`, `status` *(pending, completed)*, `completion_timestamp` |

---

### C. Document Collection & Communication

These tables manage secure file uploads and scheduling of automated welcome email sequences.

| Table | Fields |
|-------|--------|
| `Documents` | `id`, `user_id`, `file_type` *(ID, Tax_Form)*, `s3_url`, `verification_status` *(pending, approved, rejected)* |
| `Welcome_Sequences` | `id`, `role_id`, `email_subject`, `email_body`, `delay_days` — triggered X days after start date |

---

## 2. AI FAQ Model (Vector + Metadata)

For the AI chatbot to accurately answer questions about company policies, documents must be stored as structured vector embeddings rather than raw PDFs. This enables semantic search via **Retrieval-Augmented Generation (RAG)**.

| Table / Namespace | Fields | Purpose |
|-------------------|--------|---------|
| `Policy_Metadata` | `policy_id`, `title`, `version`, `access_level` | Ensure a New Hire cannot access restricted policies (e.g., Executive Salary) |
| `Policy_Embeddings` | `id`, `policy_id`, `text_chunk`, `vector_embedding` | High-dimensional vector representation used for AI-powered semantic search |
| `Chat_History` | `id`, `user_id`, `query`, `ai_response`, `feedback_score` | Allows HR to surface recurring confusion and improve policy documentation |

---

## 3. System Data Flow

The following describes how core components interact — from HR provisioning a new user, to the AI bot retrieving relevant policy data in real time.

```
HR Admin
   │
   ├── Creates user + assigns Role
   │        │
   │        └── System selects Onboarding_Template
   │                 │
   │                 └── Instantiates Employee_Tasks (with due_day_offset)
   │
   ├── Cron Job (runs daily)
   │        │
   │        └── Checks Welcome_Sequences.delay_days
   │                 │
   │                 └── Dispatches scheduled emails to New Hire
   │
   └── HR Dashboard
            │
            └── Aggregates Employee_Tasks → Completion leaderboard

New Hire
   │
   ├── Logs in → Sees pending Employee_Tasks (filtered by user_id)
   │
   └── AI Chatbot
            │
            ├── Query embedded → vector search on Policy_Embeddings
            ├── Access_level checked via Policy_Metadata
            └── Top 3 chunks + question sent to LLM → cited answer
```

**Key flows:**

- HR Admin creates a user and assigns a role → system auto-selects an Onboarding Template
- Template tasks are instantiated as `Employee_Tasks` with `due_day_offset` deadlines
- A scheduled Cron Job evaluates `Welcome_Sequences` and dispatches emails at the right time
- New Hire interacts with the AI Chatbot → query is embedded, matched to `Policy_Embeddings`, and answered via LLM
- HR Dashboard queries `Employee_Tasks` aggregates to display a real-time completion leaderboard

---

## 4. Feature Implementation Logic

### A. Welcome Sequence Email Trigger

Use a **Cron Job** or **Workflow Engine** (e.g., Temporal or BullMQ). Every morning, the following process runs automatically:

1. Fetch all records from `Employee_Onboarding_Instance`
2. Compute `days_since_start = today − start_date` for each record
3. Query `Welcome_Sequences` where `delay_days = days_since_start`
4. Dispatch matched emails via the configured mail provider

```js
// Pseudocode — runs daily via cron
const instances = await db.query('SELECT * FROM Employee_Onboarding_Instance');

for (const instance of instances) {
  const daysSinceStart = diffInDays(today, instance.start_date);
  const emails = await db.query(
    'SELECT * FROM Welcome_Sequences WHERE delay_days = ?',
    [daysSinceStart]
  );
  for (const email of emails) {
    await mailer.send({ to: instance.user_email, ...email });
  }
}
```

---

### B. Role-Based Dashboard

Each user role receives a filtered view of the system, reducing cognitive load and protecting data integrity.

**HR Admin View** — "God Mode" query joining `Users` and `Employee_Tasks`:

```sql
SELECT
  u.email,
  COUNT(et.id) AS total_tasks,
  SUM(CASE WHEN et.status = 'completed' THEN 1 ELSE 0 END) AS completed,
  ROUND(100.0 * SUM(CASE WHEN et.status = 'completed' THEN 1 ELSE 0 END) / COUNT(et.id), 1) AS progress_pct
FROM Users u
JOIN Employee_Onboarding_Instance eoi ON u.id = eoi.user_id
JOIN Employee_Tasks et ON eoi.id = et.onboarding_instance_id
GROUP BY u.id
ORDER BY progress_pct DESC;
```

**New Hire View** — filtered to the current user's pending tasks only:

```sql
SELECT task_name, task_type, due_day_offset
FROM Employee_Tasks et
JOIN Template_Tasks tt ON et.task_id = tt.id
WHERE et.onboarding_instance_id = :current_instance_id
  AND et.status = 'pending'
ORDER BY tt.due_day_offset ASC;
```

---

### C. AI Chatbot — Retrieval-Augmented Generation (RAG)

When a user submits a question (e.g., *"What is the policy on remote work?"*), the following pipeline executes:

```
User query
    │
    ▼
1. EMBED — Convert question to vector via embedding model
    │
    ▼
2. SEARCH — Query Policy_Embeddings for top 3 most similar chunks
           (filtered by Policy_Metadata.access_level for the user's role)
    │
    ▼
3. PROMPT — Send question + retrieved chunks to LLM
    │
    ▼
Answer with source reference returned to user
```

1. **Embed** — The question is converted into a high-dimensional vector using an embedding model
2. **Search** — The vector store (e.g., Pinecone or pgvector) returns the top 3 most semantically similar `Policy_Embeddings`
3. **Prompt** — The original question and retrieved chunks are sent to an LLM (e.g., Gemini or Claude) to generate a grounded, cited answer

> **Access control** is enforced at the retrieval stage: the `Policy_Metadata.access_level` field filters out restricted content before embedding lookup, ensuring New Hires never receive information above their clearance level.

---

*End of Implementation Plan*
