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
import { userActivityQueryOptions } from "@/features/insights/api/fetchUserActivity";
import { Empty } from "../-components/study/Empty/Empty";

export const Route = createFileRoute("/app/study")({
	component: RouteComponent,
});

function RouteComponent() {
	const userActivityQuery = useSuspenseQuery(userActivityQueryOptions());
	const decksQuery = useSuspenseQuery(decksQueryOptions());
	const decks = decksQuery.data;
	const cards = getAllCardsFromDecks(decks as DeckWithCards[]);
	const cardsDue = filterCardsDue(cards);

	return (
		<Stack h={"calc(100vh - 64px)"} justify="space-between" align="center">
			{cardsDue.length ? (
				<>
					<FlashCard
						id={cardsDue[0].id}
						front={cardsDue[0].content.front}
						back={cardsDue[0].content.back}
						level={cardsDue[0].level}
					/>
					<Toolbar
						cardId={cardsDue[0].id}
						sessionId={userActivityQuery.data.id}
						level={cardsDue[0].level}
					/>
				</>
			) : (
				<Empty />
			)}
		</Stack>
	);
}
