import { Stack } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { CardForm } from "@/features/cards/components/CardForm/CardForm";

const RouteComponent = () => {
	const ids = Route.useParams();
	// const card: Card = Route.useLoaderData();

	return (
		<Stack w={"100%"}>
			<CardForm deckId={ids.deckId} cardId={undefined} content={undefined} />
		</Stack>
	);
};

export const Route = createFileRoute("/app/decks_/$deckId_/card/{-$cardId}")({
	component: RouteComponent,
	// loader: async ({ params }) => {
	// 	if (params.cardId) {
	// 		await getCard({ data: { id: params.cardId } });
	// 	}
	// },
});
