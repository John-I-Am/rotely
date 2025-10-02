import type { z } from "zod";
import type { CardContentSchema } from "@/lib/zod/schemas";

export type CardContent = z.infer<typeof CardContentSchema>;
export type CardType = CardContent["type"];

declare global {
	namespace PrismaJson {
		type CardContentType = CardContent;
	}
}
