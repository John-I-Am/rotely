import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuthUser } from "@/features/login/api/users";
import { LoginForm } from "@/features/login/components/loginForm";

const RouteComponent = () => {
	return <LoginForm />;
};

export const Route = createFileRoute("/login")({
	beforeLoad: async ({ location }) => {
		if (getAuthUser() as any) {
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
