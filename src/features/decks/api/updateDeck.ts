import { useMutation } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import prisma from "@/lib/prisma/prisma";
import { queryClient } from "@/lib/query/queryClient";
import { DeckUpdateSchema } from "../utils/schemas";

const updateDeck = createServerFn({ method: "POST" })
	.validator((data) => DeckUpdateSchema.parse(data))
	.handler(async ({ data }) => {
		const updatedDeck = await prisma.deck.update({
			where: {
				id: data.id,
			},
			data: {
				title: data.title,
				description: data.description,
			},
		});

		return updatedDeck;
	});

export const useUpdateDeckMutation = () => {
	return useMutation({
		mutationKey: ["decks", "update"],
		mutationFn: (data: { id: string; title?: string; description?: string }) =>
			updateDeck({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["decks"] });
		},
	});
};
