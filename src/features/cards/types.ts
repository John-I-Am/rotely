import type { z } from "zod";
import type { CardContentSchema } from "@/lib/zod/schemas";
import type {
	NewCardInputSchema,
	UpdateCardInputSchema,
} from "./utils/schemas";

export type CardContent = z.infer<typeof CardContentSchema>;
export type CardType = CardContent["type"];

export type NewCardInput = z.infer<typeof NewCardInputSchema>;
export type UpdateCardInput = z.infer<typeof UpdateCardInputSchema>;

declare global {
	namespace PrismaJson {
		type CardContentType = CardContent;
	}
}
