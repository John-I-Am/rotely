import type { Prisma } from "@/generated/prisma/client";

export type UserActivityWithCards = Prisma.UserActivityGetPayload<{
	include: {
		reviewedCards: true;
	};
}>;
