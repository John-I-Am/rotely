import z from "zod";

const CardTextContentSchema = z.object({
	type: z.literal("text"),
	front: z.string().min(1),
	back: z.string().min(1),
});

const CardClozeContentSchema = z.object({
	type: z.literal("cloze"),
	text: z.string().min(1),
	key: z.string().min(1),
});

const CardContentSchema = z.discriminatedUnion("type", [
	CardTextContentSchema,
	CardClozeContentSchema,
]);

export const NewCardInputSchema = z.object({
	deckId: z.cuid(),
	content: CardContentSchema,
});

export const UpdateCardInputSchema = z
	.object({
		cardId: z.cuid(),
		content: CardContentSchema.optional(),
		level: z.number().min(1).max(5).optional(),
	})
	.strict();
