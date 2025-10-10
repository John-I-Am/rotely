import { Button, Group, Progress, Text } from "@mantine/core";
import { useUpdateCardMutation } from "../../api/updateCard";
import classes from "./Toolbar.module.css";

type ToolbarProps = {
	cardId: string;
	level: number;
};

export const Toolbar = ({ cardId, level }: ToolbarProps) => {
	const { mutate: updateCard, isPending } = useUpdateCardMutation();

	const handleCorrect = () => {
		updateCard({ cardId, level: level === 5 ? 5 : level + 1 });
	};

	const handleIncorrect = async () => {
		updateCard({ cardId, level: level === 5 ? 5 : level + 1 });
	};

	return (
		<Group className={classes.container} justify="space-between">
			<Group gap="xs" w="25%">
				<Text>0</Text>
				<Progress size="sm" value={3} w="100%" />
				<Text>50</Text>
			</Group>
			<Group>
				<Button loading={isPending} onClick={handleCorrect}>
					correct
				</Button>
				<Button loading={isPending} onClick={handleIncorrect}>
					incorrect
				</Button>
			</Group>
		</Group>
	);
};
