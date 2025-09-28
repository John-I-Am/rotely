import { Box, Group } from "@mantine/core";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { NavBurger } from "@/components/NavBurger/NavBurger";
import { Navbar } from "@/components/Navbar/Navbar";
import { getAuthUser } from "@/features/auth/api/users";

const AppLayoutComponent = () => {
	return (
		<Group w="100%" align="flex-start" gap={0}>
			<NavBurger />
			<Navbar isDrawer={false} />
			<Box w="100%" h="100%" p="md">
				<Outlet />
			</Box>
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
