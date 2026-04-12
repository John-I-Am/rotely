import { useMutation } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import prisma from "@/lib/prisma/prisma";
import { queryClient } from "@/lib/query/queryClient";
import type { UpdateCardInput } from "../types";
import { UpdateCardInputSchema } from "../utils/schemas";

const updateCard = createServerFn({ method: "POST" })
	.inputValidator((data) => UpdateCardInputSchema.parse(data))
	.handler(async ({ data }) => {
		const { cardId, ...updateData } = data;

		const updatedCard = await prisma.card.update({
			where: {
				id: cardId,
			},
			data: {
				...updateData,
			},
		});

		return updatedCard;
	});

export const useUpdateCardMutation = () => {
	return useMutation({
		mutationKey: ["cards", "update"],
		mutationFn: (data: UpdateCardInput) => updateCard({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["decks"] });
		},
	});
};
