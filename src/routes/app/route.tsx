import { Container, Group } from "@mantine/core";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { NavBurger } from "@/components/NavBurger/NavBurger";
import { Navbar } from "@/components/Navbar/Navbar";
import { getAuthUser } from "@/features/auth/api/users";
import { decksQueryOptions } from "@/features/decks/api/fetchDecks";
import { userActivityQueryOptions } from "@/features/insights/api/fetchUserActivity";
import { userPreferenceQueryOptions } from "@/features/users/api/fetchPreferences";

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
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(decksQueryOptions());
		context.queryClient.ensureQueryData(userActivityQueryOptions());
		context.queryClient.ensureQueryData(userPreferenceQueryOptions());
		return null;
	},

	component: AppLayoutComponent,
});
