import { createFileRoute } from "@tanstack/react-router";
import { CardTable } from "@/features/cards/components/CardTable/CardTable";
import { getDeck } from "@/features/decks/api/decks";
import { DeckEditor } from "@/features/decks/components/DeckEditor/DeckEditor";

export const Route = createFileRoute("/app/decks_/$deckId")({
	component: RouteComponent,
	loader: ({ params }) => getDeck({ data: { id: params.deckId } }),
});

function RouteComponent() {
	const { deckId } = Route.useParams();
	const { title, description }: { title: string; description: string } =
		Route.useLoaderData();

	return (
		<div>
			<DeckEditor id={deckId} title={title} description={description} />
			<CardTable deckId={deckId} />
		</div>
	);
}
