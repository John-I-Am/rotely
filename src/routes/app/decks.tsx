import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const deckSearchSchema = z.object({
	shared: z.boolean().catch(false).default(false),
});

type DeckSearch = z.infer<typeof deckSearchSchema>;

const RouteComponent = () => {
	const { shared } = Route.useSearch();

	return <div>Hello "/app/collections"!</div>;
};

export const Route = createFileRoute("/app/decks")({
	validateSearch: (search) => deckSearchSchema.parse(search),
	component: RouteComponent,
});
