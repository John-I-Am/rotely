import { Accordion, Group, Stack, Text } from "@mantine/core";
import type { ContextModalProps } from "@mantine/modals";
import {
	IconLayout2Filled,
	IconLayoutBoardSplitFilled,
	IconLayoutDashboardFilled,
	IconSquareRoundedArrowDownFilled,
	IconSquareRoundedArrowUpFilled,
} from "@tabler/icons-react";
import { IconWrapper } from "@/components/IconWrapper/IconWrapper";
import type { UserActivityWithCards } from "../../types";
import { GoalDisplay } from "../GoalDisplay/GoalDisplay";
import classes from "./DayOverviewModal.module.css";

export const DayOverviewModal = ({
	innerProps,
}: ContextModalProps<{ userActivity: UserActivityWithCards | null }>) => {
	const userActivity = innerProps.userActivity;

	const data = [
		{
			icon: <IconWrapper icon={IconLayout2Filled} />,
			label: "Cards to study",
			value: 0,
			description: (
				<>
					<Text size="sm">
						These are cards we think are new to you. You either answered them
						incorrectly or you pressed the "Learn card" button on them for the
						first time today.
					</Text>
				</>
			),
		},
		{
			icon: <IconWrapper icon={IconLayoutDashboardFilled} />,
			label: "Learned cards",
			value: userActivity?.reviewedCards.length ?? 0,
			description: (
				<Stack>
					<Group>
						<IconWrapper icon={IconSquareRoundedArrowUpFilled} size={70} />
						<Text size="sm">
							Trending up: Learning a word from your "Cards to study", i.e., one
							that you did not know before, or relearning a card that you had
							previously forgotten.
						</Text>
						<Text>0</Text>
					</Group>
					<Group>
						<IconWrapper icon={IconSquareRoundedArrowDownFilled} size={70} />
						<Text size="sm">
							Trending down: These usually make up around 35% of all answers
							given and indicate that you have forgotten a card that you
							previously know.
						</Text>
						<Text>0</Text>
					</Group>
				</Stack>
			),
		},
		{
			icon: <IconWrapper icon={IconLayoutBoardSplitFilled} />,
			label: "Cards reinforced",
			value: 0,
			description: (
				<Text size="sm">
					This refer to cards that you have answered correctly more than once in
					a row. Each time you answer correctly, the interval between repeats
					increases and the card sticks deeper in your memory.
				</Text>
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
			<GoalDisplay
				editable={false}
				goal={userActivity?.goal ?? 0}
				reviewed={userActivity?.reviewedCards.length ?? 0}
			/>
			<Accordion
				classNames={{
					root: classes.accordian,
				}}
				variant="filled"
			>
				{items}
			</Accordion>
		</Stack>
	);
};
