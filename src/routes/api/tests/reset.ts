import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/auth/auth-client";
import prisma from "@/lib/prisma/prisma";

export const Route = createFileRoute("/api/tests/reset")({
	server: {
		handlers: {
			GET: async ({ request }: { request: Request }) => {
				return new Response(
					JSON.stringify({ message: "use POST request to reset the db" }),
				);
			},
			POST: async ({ request }: { request: Request }) => {
				if (process.env.NODE_ENV === "production") {
					throw new Error("Do not reset db in production!");
				}

				await prisma.verification.deleteMany({});
				await prisma.user.deleteMany({});

				const email = "test@example.com";

				const account = await authClient.signUp.email({
					email,
					password: "12345678",
					name: email,
				});
				return new Response(JSON.stringify(account));
			},
		},
	},
});
