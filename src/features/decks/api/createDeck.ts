import { useMutation } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getAuthUser } from "@/features/auth/api/users";
import prisma from "@/lib/prisma/prisma";
import { queryClient } from "@/lib/query/queryClient";
import { DeckTitleSchema } from "../utils/schemas";

const createDeck = createServerFn({ method: "POST" })
	.validator((data) => DeckTitleSchema.parse(data))
	.handler(async ({ data }) => {
		const user = await getAuthUser();
		if (!user) throw new Error("Unauthorized");

		const newDeck = await prisma.deck.create({
			data: {
				title: data.title,
				authorId: user.id,
			},
		});

		return newDeck;
	});

export const useCreateDeckMutation = () => {
	return useMutation({
		mutationKey: ["decks", "create"],
		mutationFn: (newDeckData: { title: string }) =>
			createDeck({ data: newDeckData }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["decks"] }),
	});
};
