import { Group } from "@mantine/core";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { NavBurger } from "@/components/NavBurger/NavBurger";
import { Navbar } from "@/components/Navbar/Navbar";
import { getAuthUser } from "@/features/auth/api/users";

const AppLayoutComponent = () => {
	return (
		<Group w="100%">
			<NavBurger />
			<Navbar isDrawer={false} />
			<Outlet />
		</Group>
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
