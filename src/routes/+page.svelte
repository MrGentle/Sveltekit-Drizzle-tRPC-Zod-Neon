<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { Task } from '../schema/task.js';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { scale } from 'svelte/transition';
	export let data;
	$: tasks = data.tasks;
	let loading = false;

	const addTaskEnhance: SubmitFunction = () => {
		return async ({ result, update }) => {
			console.log(result);

			if (result.type == 'success') {
				const incomingTask = result.data as Task;
				tasks = [...data.tasks, incomingTask];
			}

			await applyAction(result);
			await update();
		};
	};
</script>

<div class="flex flex-col flex-wrap content-center gap-2 rounded bg-slate-950 p-10 shadow-md">
	<h1 class="mb-4 text-center text-3xl">SvelteKit + Drizzle + tRPC + zod + Neon</h1>

	{#if tasks.length > 0}
		{#each tasks.sort((a, b) => a.id - b.id) as task}
			<div transition:scale class="flex gap-1 rounded bg-slate-800 p-2">
				<h3 class="grow">{task.name}</h3>
				<form method="post" action="?/delete-task" use:enhance>
					<input name="id" type="number" hidden bind:value={task.id} />
					<button
						disabled={loading}
						class="rounded border-2 px-2 text-center align-middle font-bold text-white">X</button
					>
				</form>
			</div>
		{/each}
	{:else}
		<div class="text-center">You've finished all your tasks!</div>
	{/if}

	<form method="post" action="?/add-task" use:enhance={addTaskEnhance}>
		<div class="flex max-h-12 w-full">
			<input
				placeholder="I also have to remember to .."
				name="name"
				type="text"
				class="w-2/3 rounded-sm border border-cyan-600 p-2 text-black"
			/>
			<button class="w-1/3 bg-indigo-600 text-center font-bold uppercase">Add task</button>
		</div>
	</form>
</div>
