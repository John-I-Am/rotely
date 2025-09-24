import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuthUser } from "@/features/auth/api/users";
import { LoginForm } from "@/features/auth/components/LoginForm";

const RouteComponent = () => {
	return <LoginForm />;
};

export const Route = createFileRoute("/login")({
	beforeLoad: async ({ location }) => {
		if (await getAuthUser()) {
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
