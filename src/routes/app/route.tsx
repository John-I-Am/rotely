import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getAuthUser } from "@/features/auth/api/users";

const AppLayoutComponent = () => {
	return (
		<div>
			<h1>App Layout</h1>
			<Outlet />
		</div>
	);
};

export const Route = createFileRoute("/app")({
	beforeLoad: async () => {
		if (!(await getAuthUser())) {
			throw redirect({
				to: "/login",
			});
		}
	},
	component: AppLayoutComponent,
});
