import { Button, Group, Paper, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import {
	IconSquareNumber0Filled,
	IconSquareNumber1Filled,
	IconSquareNumber2Filled,
	IconSquareNumber3Filled,
	IconSquareNumber4Filled,
	IconSquareNumber5Filled,
	IconSquareNumber6Filled,
	IconSquareNumber7Filled,
	IconSquareNumber8Filled,
	IconSquareNumber9Filled,
} from "@tabler/icons-react";
import { IconWrapper } from "@/components/IconWrapper/IconWrapper";
import classes from "./GoalDisplay.module.css";

const digitIcons: Record<number, typeof IconSquareNumber0Filled> = {
	0: IconSquareNumber0Filled,
	1: IconSquareNumber1Filled,
	2: IconSquareNumber2Filled,
	3: IconSquareNumber3Filled,
	4: IconSquareNumber4Filled,
	5: IconSquareNumber5Filled,
	6: IconSquareNumber6Filled,
	7: IconSquareNumber7Filled,
	8: IconSquareNumber8Filled,
	9: IconSquareNumber9Filled,
};

type GoalDisplayProps = {
	editable?: boolean;
	goal: number;
	reviewed: number;
};

export const GoalDisplay = ({
	editable = true,
	goal,
	reviewed,
}: GoalDisplayProps) => {
	const digits: string[] = goal.toString().split("");

	return (
		<Paper>
			<Group>
				<Group gap={0}>
					{digits.map((digit: string, index: number) => {
						return (
							<IconWrapper key={index + digit} icon={digitIcons[+digit]} />
						);
					})}
				</Group>
				<Stack gap={"xs"}>
					<Group justify="space-between">
						<Text fw={600}>Today's goal</Text>
						{editable && (
							<Button
								onClick={() =>
									modals.openContextModal({
										modal: "goalSlider",
										title: "Daily Goal",
										innerProps: {},
										classNames: { title: classes["modal-title"] },
									})
								}
							>
								Change Goal
							</Button>
						)}
					</Group>

					<Text size="sm">Complete {goal} cards</Text>
					<Text size="sm">
						You have done <span className={classes.text}> {reviewed}</span>{" "}
						cards today. Complete{" "}
						<span className={classes.text}>{goal - reviewed}</span> cards in
						order to achieve your goal.
					</Text>
				</Stack>
			</Group>
		</Paper>
	);
};
