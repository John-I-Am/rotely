import { Stack } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { FlashCard } from "@/features/cards/components/FlashCard/FlashCard";
import { Toolbar } from "@/features/cards/components/Toolbar/Toobar";
import {
	filterCardsDue,
	getAllCardsFromDecks,
} from "@/features/cards/utils/queries";
import { getAllDecks } from "@/features/decks/api/decks";

import type { DeckWithCards } from "@/features/decks/types";

export const Route = createFileRoute("/app/study")({
	component: RouteComponent,
	loader: async () => await getAllDecks({ data: { includeCards: true } }),
});

function RouteComponent() {
	const decks: DeckWithCards[] = Route.useLoaderData();
	const cards = getAllCardsFromDecks(decks);
	const cardsDue = filterCardsDue(cards);

	return (
		<Stack
			h={"100vh"}
			my={-40} // this adjusts 100vh height so it won't overextend the page due to parent container padding
			p={{ base: "md", md: "xl" }}
			justify="space-between"
		>
			{cardsDue.length && (
				<>
					<FlashCard
						id={cardsDue[0].id}
						front={cardsDue[0].content.front}
						back={cardsDue[0].content.back}
						level={cardsDue[0].level}
					/>
					<Toolbar cardId={cards[0].id} level={cards[0].level} />
				</>
			)}
		</Stack>
	);
}
