<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Standalone from '../standalone/standalone.svelte';
	import type { StandaloneProps } from '../types';

	interface $$Props extends HTMLInputAttributes {
		standalone?: StandaloneProps | undefined;
		loading?: boolean | undefined;
	}

	export let standalone: StandaloneProps | undefined = undefined;
	export let loading: boolean | undefined = undefined;
</script>

<Standalone standaloneProps={standalone}>
	<button
		role="checkbox"
		aria-label={standalone?.label?.text}
		aria-checked={$$restProps.checked}
		{...$$restProps}
		name={undefined}
		class={loading ? 'loading' : ''}
	/>
</Standalone>

<style>
	button {
		vertical-align: middle;
		background: white;
		width: 0.9rem;
		height: 0.9rem;
		border-radius: 2px;
	}

	button:hover {
		background-color: lightgray;
	}

	button:disabled {
		background-color: lightgray;
		mix-blend-mode: overlay;
	}

	button[checked=''],
	button[checked='true'] {
		background-color: dodgerblue;
		background-image: url('./check.svg');
		background-size: 100%;
		background-repeat: no-repeat;
	}

	button[checked='true']:hover {
		background-color: blue;
	}

	button.loading {
		background-image: url('./spinner.svg');
	}
</style>
