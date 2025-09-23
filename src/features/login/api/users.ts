import { createServerFn } from "@tanstack/react-start";
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
