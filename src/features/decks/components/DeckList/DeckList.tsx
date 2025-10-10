import { Button, Group, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { IconWrapper } from "@/components/IconWrapper/IconWrapper";
import type { Deck } from "@/generated/prisma/client";
import { useCreateDeckMutation } from "../../api/createDeck";
import { DeckDisplay } from "../DeckDisplay/DeckDisplay";

type DeckListProps = {
	decks: Deck[];
};

export const DeckList = ({ decks }: DeckListProps) => {
	const { mutate: createDeck, isPending } = useCreateDeckMutation();
	const navigate = useNavigate({ from: "/app/decks" });

	const [searchTerm, setSearchTerm] = useState<string>("");
	const filteredDecks = decks.filter((deck: Deck) =>
		deck.title.includes(searchTerm),
	);

	const handleCreate = () => {
		createDeck(
			{ title: "untitled" },
			{
				onSuccess: (newDeck) => {
					navigate({
						to: "/app/decks/$deckId",
						params: { deckId: newDeck?.id },
					});
				},
			},
		);
	};

	return (
		<Stack>
			<Group>
				<Button loading={isPending} onClick={handleCreate}>
					New Deck
				</Button>
				<TextInput
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.currentTarget.value)}
					placeholder="Search by title"
					leftSection={<IconWrapper icon={IconSearch} size={18} stroke={2} />}
				/>
			</Group>
			<SimpleGrid cols={{ base: 1, xs: 2, md: 3, lg: 4 }}>
				{filteredDecks.map((deck: Deck) => (
					<DeckDisplay
						key={deck.id}
						id={deck.id}
						title={deck.title}
						description={deck?.description ?? ""}
					/>
				))}
			</SimpleGrid>
		</Stack>
	);
};
