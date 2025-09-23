import { createServerFn } from "@tanstack/react-start";
import prisma from "@/lib/prisma/prisma";

export const getDecks = createServerFn({ method: "GET" }).handler(async () => {
	const allUsers = await prisma.deck.findMany();
	console.log(allUsers);
});

export const createDeck = createServerFn({ method: "POST" }).handler(
	async () => {
		await prisma.deck.create({
			data: {
				title: "this is my deck",
				authorId: "234",
			},
		});
	},
);
