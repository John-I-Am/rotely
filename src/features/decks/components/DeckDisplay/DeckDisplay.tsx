import {
	ActionIcon,
	Group,
	Paper,
	Progress,
	Stack,
	Text,
	Tooltip,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
	IconEdit,
	IconFlag,
	IconFlagFilled,
	IconPacman,
	IconTrash,
} from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { IconWrapper } from "@/components/IconWrapper/IconWrapper";
import { userPreferenceQueryOptions } from "@/features/users/api/fetchPreferences";
import { useUpdateUserPreferenceMutation } from "@/features/users/api/updatePreferences";
import { useDeleteDeckMutation } from "../../api/deleteDeck";

type DeckDisplayProps = {
	id: string;
	title: string;
	description: string;
};
export const DeckDisplay = ({ id, title, description }: DeckDisplayProps) => {
	const { mutate: deleteDeck, isPending } = useDeleteDeckMutation();
	const { mutate: updateActiveIds } = useUpdateUserPreferenceMutation();
	const { data: userPreferences } = useSuspenseQuery(
		userPreferenceQueryOptions(),
	);

	const [active, setActive] = useState<boolean>(
		userPreferences.activeDecks.includes(id),
	);

	const handleToggleActive = () => {
		let updatedArray = [...userPreferences.activeDecks];
		if (active) {
			updatedArray = updatedArray.filter((deckId) => deckId !== id);
			setActive(false);
		} else {
			updatedArray.push(id);
			setActive(true);
		}
		updateActiveIds({ ...userPreferences, activeDecks: updatedArray });
	};

	const handleDelete = async () => {
		modals.openConfirmModal({
			title: "Are you sure?",
			children: (
				<Text size="sm">
					Please confirm your action. Deck deletion is irreversible and all data
					will be lost!
				</Text>
			),
			confirmProps: { color: "red" },
			onCancel: () => {},
			onConfirm: () => {
				const updatedArray = [...userPreferences.activeDecks].filter(
					(deckId) => deckId !== id,
				);
				deleteDeck({ id });
				updateActiveIds({ ...userPreferences, activeDecks: updatedArray });
			},
		});
	};

	return (
		<Paper component={Stack} gap="xl" p="lg">
			<Group justify="space-between">
				<ActionIcon disabled variant="subtle" aria-label="Deck Icon">
					<IconWrapper icon={IconPacman} stroke={2} />
				</ActionIcon>
				<ActionIcon
					onClick={handleToggleActive}
					variant="subtle"
					aria-label="Deck Icon"
				>
					<IconWrapper icon={active ? IconFlagFilled : IconFlag} stroke={2} />
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
						<ActionIcon component={Link} to={id} aria-label="Edit deck">
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
