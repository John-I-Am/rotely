import { Stack } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { FlashCard } from "@/features/cards/components/FlashCard/FlashCard";
import { Toolbar } from "@/features/cards/components/Toolbar/Toobar";
import {
	filterCardsDue,
	getAllCardsFromDecks,
} from "@/features/cards/utils/queries";
import { decksQueryOptions } from "@/features/decks/api/fetchDecks";
import type { DeckWithCards } from "@/features/decks/types";

export const Route = createFileRoute("/app/study")({
	component: RouteComponent,
});

function RouteComponent() {
	const decksQuery = useSuspenseQuery(decksQueryOptions());
	const decks = decksQuery.data;
	const cards = getAllCardsFromDecks(decks as DeckWithCards[]);
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
