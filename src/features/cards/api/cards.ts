import { createServerFn } from "@tanstack/react-start";
import { getAuthUser } from "@/features/auth/api/users";
import dayjs from "@/lib/dayjs";
import prisma from "@/lib/prisma/prisma";
import { cuidSchema } from "@/lib/zod/schemas";
import { getNextReviewDate } from "../utils/reviewIntervals";
import { NewCardInputSchema, UpdateCardInputSchema } from "../utils/schemas";

export const getCard = createServerFn({ method: "GET" })
	.validator((data) => cuidSchema.parse(data))
	.handler(async ({ data }) => {
		const card = await prisma.card.findUnique({
			where: {
				id: data.id,
			},
		});

		return card;
	});

export const createCard = createServerFn({ method: "POST" })
	.validator((data) => NewCardInputSchema.parse(data))
	.handler(async ({ data: inputData }) => {
		const user = await getAuthUser();
		if (!user) return null; // should throw or redirect - leave it for now

		const newCard = await prisma.card.create({
			data: {
				content: inputData.content,
				deckId: inputData.deckId,
			},
		});

		return newCard;
	});

export const updateCard = createServerFn({ method: "POST" })
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

export const deleteCard = createServerFn({ method: "POST" })
	.validator((data) => cuidSchema.parse(data))
	.handler(async ({ data }) => {
		const deletedCard = await prisma.card.delete({
			where: {
				id: data.id,
			},
		});

		return deletedCard;
	});
