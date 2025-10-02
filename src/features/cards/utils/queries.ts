import type { DeckWithCards } from "@/features/decks/types";

export const getAllCardsFromDecks = (decks: DeckWithCards[]) => {
	const cards = decks.flatMap((deck: DeckWithCards) => deck.cards);
	return cards;
};
