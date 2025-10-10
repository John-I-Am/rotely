import { useMutation } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import prisma from "@/lib/prisma/prisma";
import { queryClient } from "@/lib/query/queryClient";
import { cuidSchema } from "@/lib/zod/schemas";

const deleteDeck = createServerFn({ method: "POST" })
	.validator((data) => cuidSchema.parse(data))
	.handler(async ({ data }) => {
		const deletedDeck = await prisma.deck.delete({
			where: {
				id: data.id,
			},
		});

		return deletedDeck;
	});

export const useDeleteDeckMutation = () => {
	return useMutation({
		mutationKey: ["decks", "delete"],
		mutationFn: (deckId: { id: string }) => deleteDeck({ data: deckId }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["decks"] }),
	});
};
