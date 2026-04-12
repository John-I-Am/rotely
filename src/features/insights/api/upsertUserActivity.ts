import { useMutation } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getAuthUser } from "@/features/auth/api/users";
import dayjs from "@/lib/dayjs";
import prisma from "@/lib/prisma/prisma";
import { queryClient } from "@/lib/query/queryClient";
import type { UserActivityWithCards } from "../types";
import { UserActivitySchema } from "../utils/schemas";

export const upsertUserActivity = createServerFn({ method: "POST" })
	.inputValidator((data) => UserActivitySchema.parse(data))
	.handler(async ({ data }) => {
		const user = await getAuthUser();
		if (!user) throw new Error("Unauthorized");

		const newUserActivity: UserActivityWithCards =
			await prisma.userActivity.upsert({
				where: {
					userId_date: {
						userId: user.id,
						date: dayjs().tz("Pacific/Auckland").startOf("day").toDate(),
					},
				},
				create: {
					// TODO: remove timezone hardcoding
					userId: user.id,
					date: dayjs().tz("Pacific/Auckland").startOf("day").toDate(),
					goal: 50,
				},
				update: {
					goal: data.goal,
				},
				include: {
					reviewedCards: true,
				},
			});

		return newUserActivity;
	});

export const useCreateUserActivityMutation = () => {
	return useMutation({
		mutationKey: ["userActivity", "create"],
		mutationFn: (data: { goal: number }) => upsertUserActivity({ data }),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["userActivity"] }),
	});
};
