import { Group, Paper, Progress, Stack, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { filterCardsDue } from "@/features/cards/utils/queries";
import type { Card } from "@/generated/prisma/client";
import classes from "./ProgressDisplay.module.css";

type ProgressDisplayProps = {
	cards: Card[];
};

export const ProgressDisplay = ({ cards }: ProgressDisplayProps) => {
	const cardsDue = filterCardsDue(cards);
	const percentage = 100 - Math.round((cardsDue.length / cards.length) * 100);

	return (
		<Paper>
			<Group justify="space-between" wrap="nowrap" pb="sm">
				<Title order={2}>My Progress</Title>
			</Group>

			<Paper
				className={classes.progress}
				onClick={() =>
					modals.openContextModal({
						size: "lg",
						modal: "progressInfo",
						title: "Active cards",
						innerProps: {},
						classNames: { title: classes["modal-title"] },
					})
				}
			>
				<Stack>
					<Title order={3}>Active cards progress</Title>
					<Progress
						classNames={{ root: classes["progress-bar"] }}
						value={percentage}
					/>
				</Stack>
			</Paper>
		</Paper>
	);
};
