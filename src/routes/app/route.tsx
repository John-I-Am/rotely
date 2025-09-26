import { AppShell, Burger, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar/Navbar";
import { getAuthUser } from "@/features/auth/api/users";

const AppLayoutComponent = () => {
	const [opened, { toggle }] = useDisclosure();

	return (
		<Group w="100%">
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
