import { integer, json, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

// Users Table
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credtis: integer(),
});

// Sessions Table
export const SessionChatTable = pgTable("sessions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar({ length: 255 }).notNull(),
  notes: text(),
  selectedDoctor: json(),
  conversation: json(),
  createdBy: varchar({ length: 255 }).references(() => usersTable.email),
  createdOn: varchar({ length: 255 }),
});
