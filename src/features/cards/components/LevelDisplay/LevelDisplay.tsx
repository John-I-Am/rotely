import { Group, Text } from "@mantine/core";
import cx from "clsx";
import classes from "./LevelDisplay.module.css";

type LevelDisplayProps = {
	level: number;
	newWord: boolean;
};

type LevelIndicatorProps = {
	level: number;
};

export const LevelIndicator = ({ level }: LevelIndicatorProps) => (
	<Group wrap="nowrap" gap={8}>
		{[1, 2, 3, 4, 5].map((num) => (
			<div
				key={num}
				className={cx(classes.level, {
					[classes[`level-${level}`]]: num <= level,
				})}
			/>
		))}
	</Group>
);

export const LevelDisplay = ({ level, newWord }: LevelDisplayProps) => {
	const handleClick = () => {
		console.log("NOT IMPLEMENTED YET");
	};

	return (
		<Group wrap="nowrap" className={classes.container} onClick={handleClick}>
			<LevelIndicator level={level} />
			{newWord && (
				<Text px="xs" fz="xs" c="blue">
					New word
				</Text>
			)}
			<Text px="xs" c="dimmed" fz="xs">
				View Details
			</Text>
		</Group>
	);
};
