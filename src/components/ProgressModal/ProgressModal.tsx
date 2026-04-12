import { Accordion, Group, Stack, Text } from "@mantine/core";
import {
	IconLayout2,
	IconLayout2Filled,
	IconLayoutBoardSplitFilled,
	IconLayoutDashboardFilled,
} from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	filterCardsDue,
	getAllCardsFromDecks,
} from "@/features/cards/utils/queries";
import { decksQueryOptions } from "@/features/decks/api/fetchDecks";
import { IconWrapper } from "../IconWrapper/IconWrapper";
import classes from "./ProgressModal.module.css";

export const ProgressModal = () => {
	const { data: decks } = useSuspenseQuery(decksQueryOptions());
	const cards = getAllCardsFromDecks(decks);
	const cardsDue = filterCardsDue(cards);

	const data = [
		{
			icon: <IconWrapper icon={IconLayout2Filled} />,
			label: "Immediate repeats",
			value: cardsDue.length,
			description: (
				<>
					<Text size="sm">
						These are the repeats that are ready and waiting for you to learn
						next, after which you can start to learn new words.
					</Text>
					<Text size="sm" pt="sm">
						It is important to keep the number of immediate repeats as low as
						possible to improve your chances of recalling them.
					</Text>
				</>
			),
		},
		{
			icon: <IconWrapper icon={IconLayoutDashboardFilled} />,
			label: "Cards in progress",
			value: cards.length,
			description: (
				<>
					<Text size="sm">
						These are cards you have answered and which are scheduled to repeat
						at some point in the next three months.
					</Text>
					<Text size="sm" pt="sm">
						Some of these cards you may be asked to repeat in a minute or an
						hour, while others in a couple of months, but these are cards that
						are not yet firmly settled in your long-term memory.
					</Text>
					<Text size="sm" pt="sm">
						Each time you answer a card correctly, the interval between repeats
						increases and the card sticks deeper in your memory.
					</Text>
				</>
			),
		},
		{
			icon: <IconWrapper icon={IconLayoutBoardSplitFilled} />,
			label: "Cards mastered",
			value: 0,
			description: (
				<>
					<Text size="sm">
						These are the cards that will not be shown as a repeat for at least
						three months or that we will presume you already know. They are more
						likely to stick in your long-term memory.
					</Text>
				</>
			),
		},
		{
			icon: <IconWrapper icon={IconLayout2} />,
			label: "Not yet seen",
			value: 0,
			description: (
				<>
					<Text size="sm">
						These are cards in your active decks that will be shown as new cards
						in the coming days, weeks, or months.
					</Text>
				</>
			),
		},
	];

	const items = data.map((item) => (
		<Accordion.Item key={item.label} value={item.label}>
			<Accordion.Control icon={item.icon}>
				<Group justify="space-between">
					{item.label} <Text pr="sm">{item.value}</Text>
				</Group>
			</Accordion.Control>
			<Accordion.Panel>{item.description}</Accordion.Panel>
		</Accordion.Item>
	));

	return (
		<Stack>
			<Text>
				This graph shows your current progress as estimated by our algorithm.
				Your active words include all the words that you’ve enabled for
				learning.
			</Text>
			<Text>
				The algorithm will decide when best to repeat a word in order to make
				your learning most efficient.
			</Text>
			<Accordion
				classNames={{ item: classes["accordian-item"] }}
				variant="filled"
			>
				{items}
			</Accordion>
		</Stack>
	);
};
