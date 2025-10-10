import { Stack } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CardTable } from "@/features/cards/components/CardTable/CardTable";
import { decksQueryOptions } from "@/features/decks/api/fetchDecks";
import { DeckEditor } from "@/features/decks/components/DeckEditor/DeckEditor";

export const Route = createFileRoute("/app/decks_/$deckId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { deckId } = Route.useParams();
	const decksQuery = useSuspenseQuery(decksQueryOptions());
	const decks = decksQuery.data;
	const deck = decks.find((deck) => deck.id === deckId);

	return (
		<Stack gap={"xl"}>
			<DeckEditor
				id={deckId}
				title={deck.title}
				description={deck.description ?? ""}
			/>
			<CardTable deckId={deckId} cards={deck.cards} />
		</Stack>
	);
}
