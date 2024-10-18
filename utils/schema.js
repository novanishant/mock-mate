import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mock_interview', {
  id: serial('id').primaryKey(),
  jsonMockResp: text('json_mock_resp').notNull(),
  jobPosition: varchar('job_position').notNull(),
  jobDesc: varchar('job_desc').notNull(),
  jobExperience: varchar('job_experience').notNull(),
  createdBy: varchar('created_by').notNull(),
  createdAt: timestamp('created_at'),
  mockId: varchar('mock_id').notNull()
});