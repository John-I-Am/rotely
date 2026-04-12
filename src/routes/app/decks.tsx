import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { decksQueryOptions } from "@/features/decks/api/fetchDecks";
import { DeckList } from "@/features/decks/components/DeckList/DeckList";
import type { DeckWithCards } from "@/features/decks/types";

const deckSearchSchema = z.object({
	shared: z.boolean().catch(false).default(false),
});

const RouteComponent = () => {
	// const { shared } = Route.useSearch();
	const decksQuery = useSuspenseQuery(decksQueryOptions());
	const decks: DeckWithCards[] = decksQuery.data;
	return <DeckList decks={decks} />;
};

export const Route = createFileRoute("/app/decks")({
	validateSearch: (search) => deckSearchSchema.parse(search),
	component: RouteComponent,
});
