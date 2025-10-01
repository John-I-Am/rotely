import z from "zod";

export const cuidSchema = z.object({
	id: z.cuid(),
});

export const CardTextContentSchema = z.object({
	type: z.literal("text"),
	front: z.string(),
	back: z.string(),
});

export const CardClozeContentSchema = z.object({
	type: z.literal("cloze"),
	text: z.string(),
	key: z.string(),
});

export const CardContentSchema = z.union([
	CardTextContentSchema,
	CardClozeContentSchema,
]);
