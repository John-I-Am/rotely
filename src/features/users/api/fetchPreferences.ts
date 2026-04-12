import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getAuthUser } from "@/features/auth/api/users";
import prisma from "@/lib/prisma/prisma";
import { defaultPreference } from "../utils/defaultPreference";
import { UserPreferenceSchema } from "../utils/schemas";

const fetchPreferences = createServerFn({ method: "GET" }).handler(async () => {
	const user = await getAuthUser();
	if (!user) throw new Error("Unauthorized");

	const userToFind = await prisma.user.findUnique({
		where: {
			id: user.id,
		},
	});

	if (!userToFind) {
		// duplication!
		throw new Error("Unauthorized");
	}
	const raw = { ...defaultPreference, ...userToFind.preferences };
	const userPreference = UserPreferenceSchema.parse(raw);

	return userPreference;
});

export const userPreferenceQueryOptions = () =>
	queryOptions({
		queryKey: ["preferences"],
		queryFn: () => fetchPreferences(),
	});
