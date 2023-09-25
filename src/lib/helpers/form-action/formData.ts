import { z, type SafeParseSuccess, type ZodSchema } from 'zod';
import type { RequestEvent } from '../../../routes/$types';
import { fail, type MaybePromise } from '@sveltejs/kit';

export interface ValidatedFormEvent extends RequestEvent {
	parsedData: SafeParseSuccess<any>;
}

export interface ValidationOptions {
	debug?: boolean;
}

const logData = (text: string, object: any) => {
	console.log(text);
	console.table(object);
};

//Higher order function for form actions to validate against a zod schema
export function validateForm(
	schema: ZodSchema,
	callback: (event: ValidatedFormEvent) => MaybePromise<any>,
	options?: ValidationOptions | undefined
) {
	return async (event: RequestEvent) => {
		const form = await event.request.formData();
		const object = Object.fromEntries(form.entries());
		if (options?.debug) logData('v IN DATA v', object);

		const res = schema.safeParse(object);
		if (options?.debug) logData('v PARSE RESULT v', res);

		if (!res.success) {
			return fail(422, {
				object,
				errors: res.error.issues
			});
		}
		if (options?.debug) logData('v OUT DATA v', res.data);

		return await callback({ ...event, parsedData: res });
	};
}

//Higher order function for form actions to validate a numeric id, then parse object to schema
export function validateNumericId(
	schema: ZodSchema,
	callback: (event: ValidatedFormEvent) => MaybePromise<any>
) {
	return async (event: RequestEvent) => {
		const form = await event.request.formData();
		const object = Object.fromEntries(form.entries());

		if (!object.id)
			return fail(400, { error: "ID can't be null when you're checking against an ID" });
		const idRes = z.string().regex(/^\d+$/).transform(Number).safeParse(object.id);

		const objectRes = schema.safeParse(object);

		if (!idRes.success) {
			return fail(422, {
				object,
				errors: idRes.error.issues
			});
		}

		if (!objectRes.success) {
			return fail(422, {
				object,
				errors: objectRes.error.issues
			});
		}

		return await callback({ ...event, parsedData: objectRes });
	};
}
