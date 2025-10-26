import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getMaxLength = (schema: z.ZodObject<any>, field: string): number | undefined => {
	try {
		const fieldSchema = schema.shape[field];
		if (!fieldSchema) return undefined;

		// Handle nullable/optional wrappers
		let innerSchema = fieldSchema;
		while (innerSchema._def.innerType) {
			innerSchema = innerSchema._def.innerType;
		}

		// Check if it's a ZodString with checks
		if (innerSchema) {
			return innerSchema.maxLength;
		}

		return undefined;
	} catch {
		return undefined;
	}
};
