import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { decksQueryOptions } from "@/features/decks/api/fetchDecks";
import { DeckList } from "@/features/decks/components/DeckList/DeckList";

const deckSearchSchema = z.object({
	shared: z.boolean().catch(false).default(false),
});

type DeckSearch = z.infer<typeof deckSearchSchema>;

const RouteComponent = () => {
	// const { shared } = Route.useSearch();
	const decksQuery = useSuspenseQuery(decksQueryOptions());
	const decks = decksQuery.data;
	return <DeckList decks={decks} />;
};

export const Route = createFileRoute("/app/decks")({
	validateSearch: (search) => deckSearchSchema.parse(search),
	component: RouteComponent,
});
