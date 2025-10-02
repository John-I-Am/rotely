import { Button, Group } from "@mantine/core";
import { createCard } from "../../api/cards";

const PLACEHOLDER_CONTENT = {
	type: "text",
	front: "this is the front of my card",
	back: "this is the back of my cards",
};

type CardTableProps = {
	deckId: string;
};

export const CardTable = ({ deckId }: CardTableProps) => {
	const handleCreate = async () => {
		const newCard = await createCard({
			data: { deckId, content: PLACEHOLDER_CONTENT },
		});
		console.log("created Card: ", newCard);
	};

	return (
		<Group>
			<Button onClick={handleCreate}>Create new Card with random values</Button>
		</Group>
	);
};
