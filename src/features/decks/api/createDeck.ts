import { useMutation } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getAuthUser } from "@/features/auth/api/users";
import prisma from "@/lib/prisma/prisma";
import { queryClient } from "@/lib/query/queryClient";

const createDeck = createServerFn({ method: "POST" }).handler(async () => {
	const user = await getAuthUser();
	if (!user) throw new Error("Unauthorized");

	const existing = await prisma.deck.findMany({
		where: {
			authorId: user.id,
			title: { startsWith: "untitled" },
		},
		select: { title: true },
	});

	let formattedTitle = "untitled";

	if (existing.length) {
		const suffixes = existing
			.map((d) => {
				const match = d.title.match(/\((\d+)\)$/);
				return match ? Number(match[1]) : null;
			})
			.filter(Boolean) as number[];

		const next = suffixes.length ? Math.max(...suffixes) + 1 : 2;
		formattedTitle = `untitled (${next})`;
	}

	const newDeck = await prisma.deck.create({
		data: {
			title: formattedTitle,
			authorId: user.id,
		},
	});

	return newDeck;
});

export const useCreateDeckMutation = () => {
	return useMutation({
		mutationKey: ["decks", "create"],
		mutationFn: createDeck,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["decks"] }),
	});
};
