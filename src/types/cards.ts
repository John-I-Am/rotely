import type { z } from "zod";
import type { CardContentSchema } from "@/lib/zod/schemas";

export type CardType = "text" | "cloze";

export type CardContent = z.infer<typeof CardContentSchema>;
export type CardTextContent = z.infer<typeof CardContentSchema> & {
	type: "text";
};
export type CardClozeContent = z.infer<typeof CardContentSchema> & {
	type: "cloze";
};
