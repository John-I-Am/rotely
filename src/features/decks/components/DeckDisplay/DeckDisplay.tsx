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
import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { IconWrapper } from "@/components/IconWrapper/IconWrapper";
import { Route as DeckRouter } from "@/routes/app/decks_.$deckId";
import { deleteDeck } from "../../api/decks";

type DeckDisplayProps = {
	id: string;
	title: string;
	description: string;
};
export const DeckDisplay = ({ id, title, description }: DeckDisplayProps) => {
	const router = useRouter();

	// surely theres a better way to handle pendingStates?
	const [isPending, setIsPending] = useState<boolean>(false);

	const handleDelete = async () => {
		setIsPending(true);
		await deleteDeck({ data: { id: id } });
		await router.invalidate();
		setIsPending(false);
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
							onClick={() => console.log(id)}
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
