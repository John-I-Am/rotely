import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getAuthUser } from "@/features/auth/api/users";
import dayjs from "@/lib/dayjs";
import prisma from "@/lib/prisma/prisma";
import type { UserActivityWithCards } from "../types";
import { upsertUserActivity } from "./upsertUserActivity";

const fetchUserActivity = createServerFn({ method: "GET" }).handler(
	async () => {
		const user = await getAuthUser();
		if (!user) throw new Error("Unauthorized");

		const userActivity: UserActivityWithCards | null =
			await prisma.userActivity.findUnique({
				where: {
					userId_date: {
						userId: user.id,
						date: dayjs().tz("Pacific/Auckland").startOf("day").toDate(),
					},
				},
				include: {
					reviewedCards: true,
				},
			});

		if (!userActivity) {
			return await upsertUserActivity({ data: { goal: 50 } });
		}

		return userActivity;
	},
);

const fetchAllUserActivities = createServerFn({ method: "GET" }).handler(
	async () => {
		const user = await getAuthUser();
		if (!user) throw new Error("Unauthorized");

		const userActivities = await prisma.userActivity.findMany({
			where: {
				userId: user.id,
			},
			include: {
				reviewedCards: true,
			},
		});

		return userActivities;
	},
);

export const allUserActivitiesQueryOptions = () =>
	queryOptions({
		queryKey: ["allUserActivites"],
		queryFn: fetchAllUserActivities,
	});

export const userActivityQueryOptions = () =>
	queryOptions({
		queryKey: ["userActivity"],
		queryFn: fetchUserActivity,
	});
