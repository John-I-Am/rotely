import { Stack } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CardTextForm } from "@/features/cards/components/CardTextForm/CardTextForm";
import type { CardTextContent, CardType } from "@/features/cards/types";
import { decksQueryOptions } from "@/features/decks/api/fetchDecks";
import type { DeckWithCards } from "@/features/decks/types";
import type { Card } from "@/generated/prisma/client";

const RouteComponent = () => {
	const { data: decks } = useSuspenseQuery(decksQueryOptions());
	const [cardType, setCardType] = useState<CardType>("text");
	const [card, setCard] = useState<Card>();

	const ids = Route.useParams();

	useEffect(() => {
		if (ids.cardId) {
			const deck: DeckWithCards | undefined = decks.find(
				(deck) => deck.id === ids.deckId,
			);

			if (deck === undefined) {
				throw new Error("Deck not found");
			}

			setCard(deck?.cards.find((card) => card.id === ids.cardId));
			setCardType(card?.content.type ?? "text");
		}
	}, [ids.cardId, ids.deckId, decks]);

	const renderForm = () => {
		switch (cardType) {
			case "text": {
				const props = card
					? { cardId: card.id, content: card.content as CardTextContent }
					: { cardId: undefined, content: undefined };

				return <CardTextForm deckId={ids.deckId} {...props} />;
			}

			case "cloze":
				return <div>not yet implemented</div>;

			default:
				return <div>something went wrong</div>;
		}
	};

	return <Stack w={"100%"}>{renderForm()}</Stack>;
};

export const Route = createFileRoute("/app/decks_/$deckId_/card/{-$cardId}")({
	component: RouteComponent,
});
