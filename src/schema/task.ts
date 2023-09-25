import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const task = pgTable('task', {
	id: serial('id').primaryKey(),
	name: text('name')
});

export const selectTaskSchema = createSelectSchema(task);
export const insertTaskSchema = createInsertSchema(task);
export const formDataTaskSchema = createInsertSchema(task, {
	id: z.optional(z.string().regex(/^\d+$/).transform(Number)),
	name: z.optional(z.nullable(z.string()))
});

export type Task = typeof task.$inferSelect;
export type NewTask = typeof task.$inferInsert;
