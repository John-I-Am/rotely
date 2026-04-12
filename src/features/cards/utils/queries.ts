import type { DeckWithCards } from "@/features/decks/types";
import type { Card } from "@/generated/prisma/client";
import dayjs from "@/lib/dayjs";

export const getAllCardsFromDecks = (decks: DeckWithCards[]) => {
	const cards = decks.flatMap((deck: DeckWithCards) => deck.cards);
	return cards;
};

export const filterCardsDue = (cards: Card[]) => {
	const cardsDue: Card[] = cards.filter((card: Card) =>
		dayjs(card.reviewAt).isSameOrBefore(dayjs()),
	);

	return cardsDue;
};
