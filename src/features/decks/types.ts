import type { Prisma } from "@/generated/prisma/client";

export type DeckWithCards = Prisma.DeckGetPayload<{
	include: { cards: true };
}>;
