import z from "zod";

export const DeckTitleSchema = z.object({
	title: z.string().max(255),
});

export const DeckUpdateSchema = z.object({
	id: z.cuid(),
	title: z.string().max(255),
});
