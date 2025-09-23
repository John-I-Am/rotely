import { type Prisma, PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
	{
		name: "Alice",
		email: "alice@prisma.io",
		decks: {
			create: [
				{
					title: "Join the Prisma Discord",
					content: "https://pris.ly/discord",
				},
				{
					title: "Prisma on YouTube",
					content: "https://pris.ly/youtube",
				},
			],
		},
	},
	{
		name: "Bob",
		email: "bob@prisma.io",
		decks: {
			create: [
				{
					title: "Follow Prisma on Twitter",
					content: "https://www.twitter.com/prisma",
				},
			],
		},
	},
];

export async function main() {
	for (const u of userData) {
		await prisma.user.create({ data: u });
	}
}

main();
