import { useMutation } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getAuthUser } from "@/features/auth/api/users";
import prisma from "@/lib/prisma/prisma";
import { queryClient } from "@/lib/query/queryClient";
import type { NewCardInput } from "../types";
import { NewCardInputSchema } from "../utils/schemas";

export const createCard = createServerFn({ method: "POST" })
	.validator((data) => NewCardInputSchema.parse(data))
	.handler(async ({ data: inputData }) => {
		const user = await getAuthUser();
		if (!user) throw new Error("Unauthorized");

		const newCard = await prisma.card.create({
			data: {
				content: inputData.content,
				deckId: inputData.deckId,
			},
		});

		return newCard;
	});

export const useCreateCardMutation = () => {
	return useMutation({
		mutationKey: ["cards", "create"],
		mutationFn: (newCardData: NewCardInput) =>
			createCard({ data: newCardData }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["decks"] }),
	});
};
