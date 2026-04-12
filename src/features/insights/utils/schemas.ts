import z from "zod";

export const UserActivitySchema = z.object({
	goal: z.number().min(0).max(200).optional(),
});
