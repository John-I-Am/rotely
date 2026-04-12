import z from "zod";

export const DeckUpdateSchema = z.object({
	id: z.cuid(),
	title: z.string().max(12),
	description: z.string().max(255),
});
