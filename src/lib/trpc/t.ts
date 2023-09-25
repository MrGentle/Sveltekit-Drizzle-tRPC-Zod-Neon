import type { Context } from '$lib/trpc/context';
import { initTRPC } from '@trpc/server';

//Helper for use in routes and middleware
export const t = initTRPC.context<Context>().create();

// tRPC convention https://trpc.io/docs/server/procedures#reusable-base-procedures
export const publicProcedure = t.procedure;
