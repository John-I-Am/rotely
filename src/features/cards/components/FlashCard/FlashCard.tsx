import { Container, Group, Stack, Text } from "@mantine/core";
import cx from "clsx";
import { useEffect, useState } from "react";
import { LevelDisplay } from "../LevelDisplay/LevelDisplay";
import classes from "./FlashCard.module.css";

type FlashCardProps = {
	id: string;
	front: string;
	back: string;
	level: number;
};

export const FlashCard = ({ id, front, back, level }: FlashCardProps) => {
	const [flipped, setFlipped] = useState<boolean>(false);

	// This resets flip state on card change
	useEffect(() => {
		setFlipped(false);
	}, [id]);

	const renderHeader = (label: string) => (
		<Group className={classes.header}>
			<LevelDisplay level={level} newWord={true} />
			<Text c="dimmed" fz="xs">
				{label}
			</Text>
		</Group>
	);

	return (
		<Container className={classes.container}>
			<Text c="dimmed" fz="xs" pb="sm" pl="md">
				Click to flip!
			</Text>
			<Stack
				className={cx(classes.card, {
					[classes.flip]: flipped === true,
				})}
				onClick={() => setFlipped(!flipped)}
			>
				<Group className={classes.front}>
					{renderHeader("front")}
					<Text className={classes["text-content"]} lineClamp={6}>
						{front}
					</Text>
				</Group>
				<Group className={classes.back}>
					{renderHeader("back")}
					<Text className={classes["text-content"]} truncate="end">
						{back}
					</Text>
				</Group>
			</Stack>
		</Container>
	);
};
