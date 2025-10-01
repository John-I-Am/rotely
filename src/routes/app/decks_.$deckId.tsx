import { createFileRoute } from "@tanstack/react-router";
import { getDeck } from "@/features/decks/api/decks";
import { DeckEditor } from "@/features/decks/components/DeckEditor/DeckEditor";

export const Route = createFileRoute("/app/decks_/$deckId")({
	component: RouteComponent,
	loader: ({ params }) => getDeck({ data: { id: params.deckId } }),
});

function RouteComponent() {
	const { deckId } = Route.useParams();
	const { title, description }: any = Route.useLoaderData();

	return (
		<div>
			<DeckEditor id={deckId} title={title} description={description} />
			Hello DECK of id ${deckId}
		</div>
	);
}

// cmg1ukolg000noo3mcky279uc
