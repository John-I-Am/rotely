import { useMutation } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getAuthUser } from "@/features/auth/api/users";
import prisma from "@/lib/prisma/prisma";
import { queryClient } from "@/lib/query/queryClient";
import type { UserPreferences } from "../types";
import { UserPreferenceSchema } from "../utils/schemas";

const updatePreferences = createServerFn({ method: "POST" })
	.inputValidator((data) => UserPreferenceSchema.parse(data))
	.handler(async ({ data }) => {
		const user = await getAuthUser();
		if (!user) throw new Error("Unauthorized");

		const updatedUser = await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				preferences: data,
			},
		});

		return updatedUser.preferences;
	});

export const useUpdateUserPreferenceMutation = () => {
	return useMutation({
		mutationKey: ["preferences", "update"],
		mutationFn: (data: UserPreferences) => updatePreferences({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["preferences"] }); // this might refresh entire app as theme comes from preferences, check??
		},
	});
};
