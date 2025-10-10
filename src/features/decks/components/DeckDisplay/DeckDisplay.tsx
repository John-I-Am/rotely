import {
	ActionIcon,
	Group,
	Paper,
	Progress,
	Stack,
	Text,
	Tooltip,
} from "@mantine/core";
import { IconEdit, IconPacman, IconTrash } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { IconWrapper } from "@/components/IconWrapper/IconWrapper";
import { Route as DeckRouter } from "@/routes/app/decks_.$deckId";
import { useDeleteDeckMutation } from "../../api/deleteDeck";

type DeckDisplayProps = {
	id: string;
	title: string;
	description: string;
};
export const DeckDisplay = ({ id, title, description }: DeckDisplayProps) => {
	const { mutate: deleteDeck, isPending } = useDeleteDeckMutation();

	const handleDelete = async () => {
		deleteDeck({ id });
	};

	return (
		<Paper component={Stack} gap="xl" p="lg">
			<Group>
				<ActionIcon variant="subtle" aria-label="Deck Icon">
					<IconWrapper icon={IconPacman} stroke={2} />
				</ActionIcon>
			</Group>
			<Stack gap="xs">
				<Text size="lg" fw={700} lineClamp={1}>
					{title}
				</Text>
				<Text size="sm" lineClamp={4}>
					{description}
				</Text>
			</Stack>

			<Group justify="space-between">
				<Group>
					<Tooltip label="Edit">
						<ActionIcon
							component={Link}
							to={DeckRouter.to}
							params={{ deckId: id } as any}
							aria-label="Edit deck"
						>
							<IconWrapper icon={IconEdit} size={20} />
						</ActionIcon>
					</Tooltip>

					<Tooltip label="Delete">
						<ActionIcon
							onClick={handleDelete}
							loading={isPending}
							color="red"
							aria-label="Delete deck"
						>
							<IconWrapper icon={IconTrash} size={20} />
						</ActionIcon>
					</Tooltip>
				</Group>

				<Progress size="xs" value={50} w="40%" />
			</Group>
		</Paper>
	);
};
