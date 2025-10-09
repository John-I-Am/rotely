import { Stack } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { CardTable } from "@/features/cards/components/CardTable/CardTable";
import { getDeck } from "@/features/decks/api/decks";
import { DeckEditor } from "@/features/decks/components/DeckEditor/DeckEditor";
import type { DeckWithCards } from "@/features/decks/types";

export const Route = createFileRoute("/app/decks_/$deckId")({
	component: RouteComponent,
	loader: ({ params }) => getDeck({ data: { id: params.deckId } }),
});

function RouteComponent() {
	const { deckId } = Route.useParams();
	const deck: DeckWithCards = Route.useLoaderData();

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
