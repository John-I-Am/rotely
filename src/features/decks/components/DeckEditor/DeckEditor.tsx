import { Group, Loader, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import { z } from "zod";
import { updateDeck } from "../../api/decks";
import classes from "./DeckEditor.module.css";

type DeckEditorProps = {
	id: string;
	title: string;
	description: string;
};

export const DeckEditor = ({ id, title, description }: DeckEditorProps) => {
	const [pending, setPending] = useState<boolean>(false);

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

	type FormInput = z.infer<typeof formSchema>;

	const handleOnSubmit = ({ title, description }: FormInput) => {
		// form.setFieldValue("title", title);
		// form.setFieldValue("description", description);

		form.onSubmit(async () => {
			setPending(true);
			await updateDeck({ data: { id, title } }).then(() => {
				setPending(false);
			});
		})();
	};

	return (
		<form
			onChange={form.onSubmit((values) => handleOnSubmit(values))}
			className={classes.form}
		>
			<Group pb="md">
				<TextInput
					{...form.getInputProps("title")}
					classNames={{
						input: classes.title,
					}}
					size=""
					// onChange={({ target }) => handleOnSubmit("title", target.value)}
					variant="unstyled"
					aria-label="Deck Title"
					maxLength={12}
					minLength={1}
					placeholder="untitled"
				/>
				<Stack gap="0" h={20}>
					{pending && (
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
				// onChange={({ target }) => handleOnSubmit("description", target.value)}
				variant="filled"
				aria-label="Description"
				maxLength={255}
				placeholder="About..."
				w="100%"
				rows={5}
			/>
		</form>
	);
};
