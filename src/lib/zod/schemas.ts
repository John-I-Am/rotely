import z from "zod";

export const cuidSchema = z.object({
	id: z.cuid(),
});
