import type { z } from "zod";
import type {
	CardContentSchema,
	CardTextContentInputSchema,
	CardTextContentSchema,
	NewCardInputSchema,
	ReviewCardInputSchema,
	UpdateCardInputSchema,
} from "./utils/schemas";

export type CardTextContent = z.infer<typeof CardTextContentSchema>;
export type CardTextContentInput = z.infer<typeof CardTextContentInputSchema>;

export type CardContent = z.infer<typeof CardContentSchema>;
export type CardType = CardContent["type"];

export type NewCardInput = z.infer<typeof NewCardInputSchema>;
export type UpdateCardInput = z.infer<typeof UpdateCardInputSchema>;

export type ReviewCardInput = z.infer<typeof ReviewCardInputSchema>;

declare global {
	namespace PrismaJson {
		type CardContentType = CardContent;
	}
}
