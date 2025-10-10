import { createServerFn } from "@tanstack/react-start";
import prisma from "@/lib/prisma/prisma";
import { cuidSchema } from "@/lib/zod/schemas";

const fetchCard = createServerFn({ method: "GET" })
	.validator((data) => cuidSchema.parse(data))
	.handler(async ({ data }) => {
		const card = await prisma.card.findUnique({
			where: {
				id: data.id,
			},
		});

		return card;
	});
