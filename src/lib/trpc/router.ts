import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { t } from './t';

// Child routes
import { taskRoutes } from './routes/tasks';

// Merge child routes into main router
export const router = t.router({
	tasks: taskRoutes
});

export type Router = typeof router;
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
