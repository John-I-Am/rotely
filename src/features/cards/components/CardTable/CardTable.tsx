import { Box, Button, Checkbox, Stack, Table, Text } from "@mantine/core";
import cx from "clsx";
import { useState } from "react";
import type { Card } from "@/generated/prisma/client";
import dayjs from "@/lib/dayjs";
import { createCard } from "../../api/cards";
import classes from "./CardTable.module.css";

// TEMPORARY HELPER FUNCTION TO CREATE CARDS FOR RESTING
function randomText(prefix: string) {
	const chars =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let text = "";
	const length = 8; // change this to make it longer

	for (let i = 0; i < length; i++) {
		text += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return `${prefix}: ${text}`;
}

type CardTableProps = {
	deckId: string;
	cards: Card[];
};

export const CardTable = ({ deckId, cards }: CardTableProps) => {
	const [selection, setSelection] = useState<string[]>(["1"]);

	const handleCreate = async () => {
		await createCard({
			data: {
				deckId,
				content: {
					type: "text",
					front: randomText("Randomized front"),
					back: randomText("Randomized back"),
				},
			},
		});
	};

	const toggleRow = (id: string) => {
		setSelection((current) =>
			current.includes(id)
				? current.filter((item) => item !== id)
				: [...current, id],
		);
	};

	const toggleAll = () =>
		setSelection((current) =>
			current.length === cards.length ? [] : cards.map((item) => item.id),
		);

	const rows = cards.map((card) => {
		const selected = selection.includes(card.id);

		return (
			<Table.Tr
				key={card.id}
				className={cx({ [classes.rowSelected]: selected })}
			>
				<Table.Td>
					<Checkbox
						checked={selection.includes(card.id)}
						onChange={() => toggleRow(card.id)}
					/>
				</Table.Td>
				<Table.Td>
					<Text size="sm" fw={700}>
						{card.content.type}
					</Text>
				</Table.Td>
				<Table.Td>
					<Text size="sm">{card.level}</Text>
				</Table.Td>
				<Table.Td>
					<Text size="sm">{dayjs(card.reviewAt).fromNow()}</Text>
				</Table.Td>
				{card.content.type === "text" && (
					<Table.Td>
						<Text size="xs" fw={700}>
							FRONT
						</Text>
						<Text size="sm" pb="lg">
							{card.content.front}
						</Text>

						<Text size="xs" fw={700}>
							BACK
						</Text>
						<Text size="sm">{card.content.back}</Text>
					</Table.Td>
				)}
			</Table.Tr>
		);
	});

	return (
		<Stack h={"100%"} className={classes.wrapper}>
			<Button onClick={handleCreate}>Create new Card with random values</Button>

			<Table verticalSpacing="sm">
				<Table.Thead>
					<Table.Tr>
						<Table.Th w={50}>
							<Checkbox
								onChange={toggleAll}
								checked={selection.length === cards.length}
								indeterminate={
									selection.length > 0 && selection.length !== cards.length
								}
							/>
						</Table.Th>
						<Table.Th w={100}>Type</Table.Th>
						<Table.Th w={100}>Level</Table.Th>
						<Table.Th w={150}>Review</Table.Th>
						<Table.Th miw={400} ta="center">
							Content
						</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</Stack>
	);
};
