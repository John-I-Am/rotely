import { Button, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import z from "zod";
import { createCard } from "../../api/cards";
import type { CardContent, CardType } from "../../types";
import classes from "./CardForm.module.css";

type CardFormProps =
	| { deckId: string; cardId: string; content: CardContent }
	| { deckId: string; cardId?: undefined; content?: undefined };

export const CardForm = ({ deckId, cardId, content }: CardFormProps) => {
	const navigate = useNavigate();
	const [pending, setPending] = useState<boolean>(false);
	const [type, setType] = useState<CardType>(content?.type ?? "text");

	const formSchema = z.object({
		front: z.string().max(225),
		back: z.string().max(225),
	});

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			front: "",
			back: "",
		},

		validate: zodResolver(formSchema),
	});

	const handleSubmit = async ({
		front,
		back,
	}: {
		front: string;
		back: string;
	}) => {
		setPending(true);
		await createCard({
			data: {
				deckId,
				content: {
					type: "text",
					front,
					back,
				},
			},
		});

		navigate({
			to: "/app/decks/$deckId",
			params: (prev) => ({ ...prev }),
		});
	};

	return (
		<form
			className={classes.form}
			onSubmit={form.onSubmit((values) => handleSubmit(values))}
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
				<Button type="submit" loading={pending}>
					Create
				</Button>
			</Stack>
		</form>
	);
};
