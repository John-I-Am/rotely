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
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { IconWrapper } from "@/components/IconWrapper/IconWrapper";
import { deleteDeck } from "../../api/decks";

type DeckDisplayProps = {
	id: string;
	title: string;
};
export const DeckDisplay = ({ id, title }: DeckDisplayProps) => {
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
					This is where my Title will go This is where my Title will go This is
					where my Title will go This is where my Title will go
				</Text>
				<Text size="sm" lineClamp={4}>
					This is where my descriptions will go. This is not implemented yet.
					This is where my descriptions will go. This is not implemented yet.
					This is where my descriptions will go. This is not implemented yet.
					This is where my descriptions will go. This is not implemented yet.
					This is where my descriptions will go. This is not implemented yet.
					This is where my descriptions will go. This is not implemented yet.
				</Text>
			</Stack>

			<Group justify="space-between">
				<Group>
					<Tooltip label="Edit">
						<ActionIcon
							onClick={() => console.log("not yet implemented")}
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
