import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/prisma/prisma";

export const getUsers = createServerFn({ method: "GET" }).handler(async () => {
	const allUsers = await prisma.user.findMany();
	return allUsers;
});

export const createUser = createServerFn({ method: "POST" }).handler(
	async () => {
		await prisma.user.create({ data: { email: "feasdf" } });
	},
);

export const getAuthUser = createServerFn({ method: "GET" }).handler(
	async () => {
		const request = getWebRequest();
		if (!request?.headers) {
			return null;
		}
		const session = await auth.api.getSession({
			headers: request.headers,
		});
		console.log(session?.user);
		return session?.user;
	},
);
