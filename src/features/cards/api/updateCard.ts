import { useMutation } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import dayjs from "dayjs";
import prisma from "@/lib/prisma/prisma";
import { queryClient } from "@/lib/query/queryClient";
import type { UpdateCardInput } from "../types";
import { getNextReviewDate } from "../utils/reviewIntervals";
import { UpdateCardInputSchema } from "../utils/schemas";

const updateCard = createServerFn({ method: "POST" })
	.validator((data) => UpdateCardInputSchema.parse(data))
	.handler(async ({ data }) => {
		const { cardId, ...updateData } = data;

		const nextReview = updateData.level
			? getNextReviewDate(updateData.level)
			: undefined;

		const updatedCard = await prisma.card.update({
			where: {
				id: cardId,
			},
			data: {
				...updateData,
				...(nextReview && { reviewAt: nextReview }),
				reviewedAt: { push: dayjs().utc().toDate() },
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
