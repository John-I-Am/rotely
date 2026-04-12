import { Button, Group, Paper, Stack, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { Route as DeckRoutes } from "@/routes/app/decks";
import { Route as StudyRoute } from "@/routes/app/study";
import classes from "./OverviewDisplay.module.css";

type OverviewDisplayProps = {
	actives: number;
};

export const OverviewDisplay = ({ actives }: OverviewDisplayProps) => {
	return (
		<Paper>
			<Group justify="space-between">
				<Stack>
					<Title order={2}>
						Active decks <span className={classes.actives}>{actives}</span>
					</Title>
					<Button size="compact-xs" component={Link} to={DeckRoutes.to}>
						Your Decks
					</Button>
				</Stack>

				<Button
					component={Link}
					to={StudyRoute.to}
					rightSection={<IconChevronRight />}
				>
					Start Learning
				</Button>
			</Group>
		</Paper>
	);
};
