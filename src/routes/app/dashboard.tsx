import { SimpleGrid, Skeleton, Stack } from "@mantine/core";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import type { Deck } from "@/generated/prisma/client";

const Dashboard = () => {
	const PRIMARY_COL_HEIGHT = "300px";
	const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

	const router = useRouter();
	const decks: Deck[] = Route.useLoaderData();

	return (
		<SimpleGrid cols={{ base: 1, sm: 2 }} w="100%">
			<Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
			<Stack>
				<Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
				<Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
			</Stack>
		</SimpleGrid>
	);
};

export const Route = createFileRoute("/app/dashboard")({
	component: Dashboard,
});
