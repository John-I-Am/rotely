import type { z } from "zod";
import type { UserPreferenceSchema } from "./utils/schemas";

export type UserPreferences = z.infer<typeof UserPreferenceSchema>;

declare global {
	namespace PrismaJson {
		type UserPreferenceType = UserPreferences;
	}
}
