import { SimpleGrid, Stack } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getAllCardsFromDecks } from "@/features/cards/utils/queries";
import { decksQueryOptions } from "@/features/decks/api/fetchDecks";
import { userActivityQueryOptions } from "@/features/insights/api/fetchUserActivity";
import { GoalDisplay } from "@/features/insights/components/GoalDisplay/GoalDisplay";
import type { UserActivityWithCards } from "@/features/insights/types";
import { userPreferenceQueryOptions } from "@/features/users/api/fetchPreferences";
import type { Card } from "@/generated/prisma/client";
import { OverviewDisplay } from "../-components/dashboard/OverviewDisplay/OverviewDisplay";
import { ProgressDisplay } from "../-components/dashboard/ProgressDisplay/ProgressDisplay";
import { StreakDisplay } from "../-components/StreakDisplay/StreakDisplay";

const Dashboard = () => {
	const { data: userActivity }: { data: UserActivityWithCards } =
		useSuspenseQuery(userActivityQueryOptions());

	const { data: userPreferences } = useSuspenseQuery(
		userPreferenceQueryOptions(),
	);

	const { data: decks } = useSuspenseQuery(decksQueryOptions());

	const activeCards: Card[] = getAllCardsFromDecks(
		decks.filter((deck) => userPreferences.activeDecks.includes(deck.id)),
	);

	return (
		<Stack>
			<OverviewDisplay actives={userPreferences.activeDecks.length} />
			<SimpleGrid cols={{ base: 1, sm: 2 }} w="100%">
				<ProgressDisplay cards={activeCards} />
				<Stack>
					<StreakDisplay />
					<GoalDisplay
						goal={userActivity.goal}
						reviewed={userActivity.reviewedCards.length}
					/>
				</Stack>
			</SimpleGrid>
		</Stack>
	);
};

export const Route = createFileRoute("/app/dashboard")({
	component: Dashboard,
});
