import { Button, Group, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { IconWrapper } from "@/components/IconWrapper/IconWrapper";
import type { Deck } from "@/generated/prisma/client";
import { createDeck } from "../../api/decks";
import { DeckDisplay } from "../DeckDisplay/DeckDisplay";

type DeckListProps = {
	decks: Deck[];
};

export const DeckList = ({ decks }: DeckListProps) => {
	const router = useRouter();

	const [searchTerm, setSearchTerm] = useState<string>("");
	const filteredDecks = decks.filter((deck: Deck) =>
		deck.title.includes(searchTerm),
	);

	const handleCreate = async () => {
		await createDeck({
			data: { title: Math.random().toString(36).slice(2, 10) },
		});
		router.invalidate();
	};

	return (
		<Stack>
			<Group>
				<Button onClick={() => handleCreate()}>New Deck</Button>
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
						description={deck.description ?? ""}
					/>
				))}
			</SimpleGrid>
		</Stack>
	);
};
