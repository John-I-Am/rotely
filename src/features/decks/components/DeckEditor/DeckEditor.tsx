import { Group, Loader, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useUpdateDeckMutation } from "../../api/updateDeck";
import classes from "./DeckEditor.module.css";

type DeckEditorProps = {
	id: string;
	title: string;
	description: string;
};

export const DeckEditor = ({ id, title, description }: DeckEditorProps) => {
	const { mutate: updateDeck, isPending } = useUpdateDeckMutation();

	const formSchema = z.object({
		title: z.string().max(12),
		description: z.string().max(255),
	});

	const form = useForm({
		initialValues: {
			title,
			description,
		},

		validate: zodResolver(formSchema),
	});

	const handleOnSubmit = async () => {
		const { title, description } = form.getValues();
		updateDeck({ id, title, description });
	};

	return (
		// Bypasses form.onSubmit, which skips validation and makes useForm a bit pointless.
		// Not sure how else to imeplement saving form on every change.
		<form onChange={() => handleOnSubmit()}>
			<Group pb="md">
				<TextInput
					{...form.getInputProps("title")}
					classNames={{
						input: classes.title,
					}}
					variant="unstyled"
					aria-label="Deck Title"
					maxLength={12}
					minLength={1}
					placeholder="untitled"
				/>
				<Stack gap="0" h={20}>
					{isPending && (
						<>
							<Text fz="xs" c="dimmed">
								Saving data...
							</Text>
							<Loader size="xs" />
						</>
					)}
				</Stack>
			</Group>

			<Textarea
				{...form.getInputProps("description")}
				variant="filled"
				aria-label="Deck Description"
				maxLength={255}
				placeholder="About..."
				radius="lg"
				rows={4}
			/>
		</form>
	);
};
