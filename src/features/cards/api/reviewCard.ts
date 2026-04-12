import { useMutation } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import prisma from "@/lib/prisma/prisma";
import { queryClient } from "@/lib/query/queryClient";
import type { ReviewCardInput } from "../types";
import { getNextReviewDate } from "../utils/reviewIntervals";
import { ReviewCardInputSchema } from "../utils/schemas";

const updateReviewedCard = createServerFn({ method: "POST" })
	.inputValidator((data) => ReviewCardInputSchema.parse(data))
	.handler(async ({ data }) => {
		const { sessionId, cardId, currentLevel, isCorrect } = data;

		let newLevel = isCorrect ? currentLevel + 1 : currentLevel - 1;

		if (newLevel > 5) {
			newLevel = 5;
		}

		if (newLevel < 1) {
			newLevel = 1;
		}

		const nextReview = getNextReviewDate(newLevel);

		const updatedCard = await prisma.card.update({
			where: {
				id: cardId,
			},
			data: {
				level: newLevel,
				reviewAt: nextReview,
			},
		});

		await prisma.cardReview.create({
			data: {
				userId: updatedCard.authorId,
				cardId: updatedCard.id,
				sessionId,
			},
		});

		return updatedCard;
	});

export const useUpdateReviewedCardMutation = () => {
	return useMutation({
		mutationKey: ["cards", "review"],
		mutationFn: (data: ReviewCardInput) => updateReviewedCard({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["decks"] });
		},
	});
};
