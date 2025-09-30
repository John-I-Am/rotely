import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getAllDecks } from "@/features/decks/api/decks";
import { DeckList } from "@/features/decks/components/DeckList/DeckList";
import type { Deck } from "@/generated/prisma/client";

const deckSearchSchema = z.object({
	shared: z.boolean().catch(false).default(false),
});

type DeckSearch = z.infer<typeof deckSearchSchema>;

const RouteComponent = () => {
	const { shared } = Route.useSearch();
	const decks: Deck[] = Route.useLoaderData();

	return <DeckList decks={decks} />;
};

export const Route = createFileRoute("/app/decks")({
	validateSearch: (search) => deckSearchSchema.parse(search),
	loader: () => {
		return getAllDecks();
	},
	component: RouteComponent,
});
