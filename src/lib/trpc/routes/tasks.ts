import { insertTaskSchema, task } from '$schema/task';
import { eq } from 'drizzle-orm';
import { publicProcedure, t } from '../t';
import { z } from 'zod';

export const taskRoutes = t.router({
	all: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.select().from(task);
	}),

	add: publicProcedure.input(insertTaskSchema).query(async ({ ctx, input }) => {
		return (await ctx.db.insert(task).values(input).returning())[0];
	}),

	remove: publicProcedure
		.input(z.object({ id: z.number().nonnegative() }))
		.query(async ({ ctx, input }) => {
			if (!input) throw new Error("id can't be null when deleting a task");
			return (await ctx.db.delete(task).where(eq(task.id, input.id)).returning())[0];
		})
});
