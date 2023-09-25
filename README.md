# SvelteKit + Drizzle + tRPC + Zod + Neon

Everything you need to start developing a modern full stack Svelte Kit project.

I am planning on adding [Lucia](https://lucia-auth.com/getting-started/sveltekit/), [Svelte Query](https://sveltequery.vercel.app/overview) and [Svelte Superforms](https://superforms.rocks/).

I suggest using [shadcn-svelte](https://www.shadcn-svelte.com/) or [Skeleton](https://www.skeleton.dev/) for your UI as they play nicely with TailwindCSS

## Why tRPC, isn't that redundant?

Mainly because I enjoy the way tRPC deals with routes, middleware, and how it plays with Zod.
You can also easily integrate it with Svelte Query.

Feel free to remove tRPC if you want to use it.

## Drizzle Kit commands

Drizzle Kit comes with a nice set of commands for working with your database.

``npm run db:generate`` generates migrations based on local schema

``npm run db:push`` pushes local schema changes directly to the database

Look [here](https://orm.drizzle.team/kit-docs/commands) for more information about the available commands.


# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
