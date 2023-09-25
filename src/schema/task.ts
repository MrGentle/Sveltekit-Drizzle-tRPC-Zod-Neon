import { boolean, numeric, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const task = pgTable('task', {
	id: serial('id').primaryKey(),
	name: text('name'),
	priority: numeric('priority').notNull().default('1'),
	complete: boolean('complete').default(false)
});

export const selectTaskSchema = createSelectSchema(task);
export const insertTaskSchema = createInsertSchema(task);
export const formDataTaskSchema = createInsertSchema(task, {
	id: z.optional(z.string().regex(/^\d+$/).transform(Number)),
	name: z.optional(z.nullable(z.string())),
	complete: z.optional(
		z.nullable(z.enum(['true', 'false']).transform((value) => value === 'true'))
	),
	priority: z.optional(z.string().regex(/^\d+$/).transform(Number))
});

export type Task = typeof task.$inferSelect;
export type NewTask = typeof task.$inferInsert;
