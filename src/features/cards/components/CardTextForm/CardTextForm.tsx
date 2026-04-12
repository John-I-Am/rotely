import { Button, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect } from "react";
import { useCreateCardMutation } from "@/features/cards/api/createCard";
import type { CardTextContent } from "@/features/cards/types";
import { CardTextContentInputSchema } from "@/features/cards/utils/schemas";
import { DictionaryForm } from "@/features/dictionary/components/DictionaryForm/DictionaryForm";
import { useUpdateCardMutation } from "../../api/updateCard";
import classes from "./CardTextForm.module.css";

type CardTextFormProps =
	| { deckId: string; cardId: string; content: CardTextContent }
	| { deckId: string; cardId?: undefined; content?: undefined };

export const CardTextForm = ({
	deckId,
	cardId,
	content,
}: CardTextFormProps) => {
	const navigate = useNavigate();

	const { mutate: createCard, isPending: isPendingCreation } =
		useCreateCardMutation();
	const { mutate: updateCard, isPending: isPendingUpdate } =
		useUpdateCardMutation();

	const form = useForm({
		mode: "uncontrolled",
		name: "card-text-form",
		initialValues: {
			front: "",
			back: "",
		},
		validate: zodResolver(CardTextContentInputSchema),
	});

	// this is required since the first render always returns undefined
	useEffect(() => {
		if (content) {
			form.setValues({
				front: content.front,
				back: content.back,
			});
		}
	}, [content]);

	const handleCreate = ({ front, back }: { front: string; back: string }) => {
		createCard(
			{
				deckId,
				content: {
					type: "text",
					front,
					back,
				},
			},
			{
				onSuccess: () => {
					navigate({
						to: "/app/decks/$deckId",
						params: () => ({ deckId }),
					});
				},
			},
		);
	};

	const handleUpdate = ({ front, back }: { front: string; back: string }) => {
		updateCard(
			{
				cardId,
				content: {
					type: "text",
					front,
					back,
				},
				// biome-ignore lint/suspicious/noExplicitAny: <handleUpdate will only be called with valid cardId>
			} as any,
			{
				onSuccess: () => {
					navigate({
						to: "/app/decks/$deckId",
						params: () => ({ deckId }),
					});
				},
			},
		);
	};

	return (
		<Stack>
			<DictionaryForm />
			<form
				className={classes.form}
				onSubmit={form.onSubmit((values) =>
					cardId ? handleUpdate(values) : handleCreate(values),
				)}
			>
				<Stack
					className={classes.container}
					gap="xl"
					p={{ base: "md", md: "xl" }}
				>
					<Textarea
						{...form.getInputProps("front")}
						variant="filled"
						aria-label="Card front"
						maxLength={255}
						placeholder="Front content"
						radius="lg"
						rows={8}
					/>
					<Textarea
						{...form.getInputProps("back")}
						variant="filled"
						aria-label="Card back"
						maxLength={255}
						placeholder="Back content"
						radius="lg"
						rows={8}
					/>
					<Button
						type="submit"
						loading={cardId ? isPendingUpdate : isPendingCreation}
					>
						{cardId ? "Edit" : "Create"}
					</Button>
				</Stack>
			</form>
		</Stack>
	);
};
