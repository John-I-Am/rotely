import { Container, Group } from "@mantine/core";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { NavBurger } from "@/components/NavBurger/NavBurger";
import { Navbar } from "@/components/Navbar/Navbar";
import { getAuthUser } from "@/features/auth/api/users";
import { decksQueryOptions } from "@/features/decks/api/fetchDecks";

const AppLayoutComponent = () => {
	return (
		<Group w="100%" align="flex-start" gap={0}>
			<NavBurger />
			<Navbar isDrawer={false} />
			<Container maw="100%" w="100%" h="100%" p={{ base: "md", md: "xl" }}>
				<Outlet />
			</Container>
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
	loader: ({ context }: any) =>
		context.queryClient.ensureQueryData(decksQueryOptions()),
	component: AppLayoutComponent,
});
