import type { PageServerLoad, Actions } from './$types';
import { router } from '$lib/trpc/router';
import { createContext } from '$lib/trpc/context';
import { formDataTaskSchema } from '$schema/task';
import { validateForm, validateNumericId } from '$lib/helpers/form-action/formData';

export const load = (async (event) => ({
	tasks: await router.createCaller(await createContext(event)).tasks.all()
})) satisfies PageServerLoad;

export const actions = {
	'add-task': validateForm(formDataTaskSchema, async (event) => {
		return await router.createCaller(await createContext(event)).tasks.add(event.parsedData.data);
	}),

	'delete-task': validateNumericId(formDataTaskSchema, async (event) => {
		return await router
			.createCaller(await createContext(event))
			.tasks.remove(event.parsedData.data);
	}),

	'toggle-task': validateForm(
		formDataTaskSchema,
		async (event) => {
			return await router
				.createCaller(await createContext(event))
				.tasks.toggle(event.parsedData.data);
		},
		{ debug: true }
	)
} satisfies Actions;
