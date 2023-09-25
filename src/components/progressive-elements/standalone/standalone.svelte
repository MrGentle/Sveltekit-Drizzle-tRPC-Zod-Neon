<script lang="ts">
	import { enhance } from '$app/forms';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import type { StandaloneProps } from '../types';

	interface $$Props extends HTMLFormAttributes {
		standaloneProps?: StandaloneProps;
	}

	export let standaloneProps: StandaloneProps | undefined = undefined;
</script>

{#if standaloneProps && standaloneProps.action}
	<form
		method={standaloneProps.method ?? 'POST'}
		action={standaloneProps.action}
		use:enhance={standaloneProps.submitFunction}
	>
		{#each standaloneProps.submitValues as submitValue}
			<input name={submitValue.name} bind:value={submitValue.value} hidden />
		{/each}
		{#if standaloneProps.label}
			<label>
				{standaloneProps.label.position == 'before' ? standaloneProps.label.text : ''}
				<slot />
				{standaloneProps.label.position == 'after' ? standaloneProps.label.text : ''}
			</label>
		{:else}
			<slot />
		{/if}
	</form>
{:else}
	{#if standaloneProps && standaloneProps.submitValues.length > 0}
		{#each standaloneProps.submitValues as submitValue}
			<input name={submitValue.name} bind:value={submitValue.value} hidden />
		{/each}
	{/if}
	<slot />
{/if}
