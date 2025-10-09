import { Button, Group, Progress, Text } from "@mantine/core";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { updateCard } from "../../api/cards";
import classes from "./Toolbar.module.css";

type ToolbarProps = {
	cardId: string;
	level: number;
};

export const Toolbar = ({ cardId, level }: ToolbarProps) => {
	const router = useRouter();
	const [pending, setPending] = useState<boolean>(false);

	const handleCorrect = async () => {
		setPending(true);
		await updateCard({ data: { cardId, level: level === 5 ? 5 : level + 1 } });
		await router.invalidate({ sync: true });
		setPending(false);
	};

	const handleIncorrect = async () => {
		setPending(true);
		await updateCard({ data: { cardId, level: level === 1 ? 1 : level - 1 } });
		await router.invalidate({ sync: true });
		setPending(false);
	};

	return (
		<Group className={classes.container} justify="space-between">
			<Group gap="xs" w="25%">
				<Text>0</Text>
				<Progress size="sm" value={3} w="100%" />
				<Text>50</Text>
			</Group>
			<Group>
				<Button loading={pending} onClick={handleCorrect}>
					correct
				</Button>
				<Button loading={pending} onClick={handleIncorrect}>
					incorrect
				</Button>
			</Group>
		</Group>
	);
};
