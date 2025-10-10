import { useMutation } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import prisma from "@/lib/prisma/prisma";
import { queryClient } from "@/lib/query/queryClient";
import { cuidSchema } from "@/lib/zod/schemas";

const deleteCard = createServerFn({ method: "POST" })
	.validator((data) => cuidSchema.parse(data))
	.handler(async ({ data }) => {
		const deletedCard = await prisma.card.delete({
			where: {
				id: data.id,
			},
		});

		return deletedCard;
	});

export const useDeleteCardMutation = () => {
	return useMutation({
		mutationKey: ["cards", "delete"],
		mutationFn: (deckId: { id: string }) => deleteCard({ data: deckId }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["decks"] }),
	});
};
