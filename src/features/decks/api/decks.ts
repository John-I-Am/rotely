import { createServerFn } from "@tanstack/react-start";
import { getAuthUser } from "@/features/auth/api/users";
import type { Deck } from "@/generated/prisma/client";
import prisma from "@/lib/prisma/prisma";
import { cuidSchema } from "@/lib/zod/schemas";
import type { DeckWithCards } from "../types";
import { DeckTitleSchema, DeckUpdateSchema } from "../utils/schemas";

export const getAllDecks = createServerFn({ method: "GET" })
	.validator((data: { includeCards: boolean }) => data)
	.handler(async ({ data }) => {
		const user = await getAuthUser();
		if (!user) return null; // should throw or redirect - leave it for now

		const decks: Deck[] | DeckWithCards[] = await prisma.deck.findMany({
			where: {
				authorId: user.id,
			},
			include: {
				cards: data.includeCards,
			},
		});

		return decks;
	});

export const getDeck = createServerFn({ method: "GET" })
	.validator((data) => cuidSchema.parse(data))
	.handler(async ({ data }) => {
		const deck = await prisma.deck.findUnique({
			where: {
				id: data.id,
			},
		});

		return deck;
	});

export const createDeck = createServerFn({ method: "POST" })
	.validator((data) => DeckTitleSchema.parse(data))
	.handler(async ({ data }) => {
		const user = await getAuthUser();
		if (!user) return null; // should throw or redirect - leave it for now

		const newDeck = await prisma.deck.create({
			data: {
				title: data.title,
				authorId: user.id,
			},
		});

		return newDeck;
	});

export const updateDeck = createServerFn({ method: "POST" })
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

export const deleteDeck = createServerFn({ method: "POST" })
	.validator((data) => cuidSchema.parse(data))
	.handler(async ({ data }) => {
		const deletedDeck = await prisma.deck.delete({
			where: {
				id: data.id,
			},
		});

		return deletedDeck;
	});
