import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getAuthUser } from "@/features/auth/api/users";
import prisma from "@/lib/prisma/prisma";
import { cuidSchema } from "@/lib/zod/schemas";
import type { DeckWithCards } from "../types";

const fetchDecks = createServerFn({ method: "GET" }).handler(async () => {
	const user = await getAuthUser();
	if (!user) throw new Error("Unauthorized");

	const decks: DeckWithCards[] = await prisma.deck.findMany({
		where: {
			authorId: user.id,
		},
		include: {
			cards: true,
		},
	});

	return decks;
});

const fetchDeckById = createServerFn({ method: "GET" })
	.inputValidator((data) => cuidSchema.parse(data))
	.handler(async ({ data }) => {
		const deck = await prisma.deck.findUnique({
			where: {
				id: data.id,
			},
			include: {
				cards: true,
			},
		});

		return deck;
	});

export const decksQueryOptions = () =>
	queryOptions({
		queryKey: ["decks"],
		queryFn: () => fetchDecks(),
	});

export const deckQueryOptions = (deckId: string) =>
	queryOptions({
		queryKey: ["decks", "deckId"],
		queryFn: () => fetchDeckById({ data: { deckId } }),
	});
