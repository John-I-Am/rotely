import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "@/features/login/components/loginForm";
import { authClient } from "@/lib/auth-client";

const RouteComponent = () => {
	return <LoginForm />;
};

export const Route = createFileRoute("/login")({
	beforeLoad: async ({ location }) => {
		const { data: session } = await authClient.getSession();
		if (!session) {
			throw redirect({
				to: "/app/dashboard",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: RouteComponent,
});
