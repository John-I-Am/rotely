import z from "zod";

export const UserPreferenceSchema = z.object({
	theme: z.enum(["light", "dark"]),
	goal: z.number().max(200),
	activeDecks: z.array(z.cuid()),
});
