import { dehydrate, hydrate, QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export type RouterContext = {
	queryClient: QueryClient;
};

export const getRouter = () => {
	const queryClient = new QueryClient();
	const router = createTanStackRouter({
		routeTree,
		scrollRestoration: true,
		context: {
			queryClient,
		},
		dehydrate: () => {
			return {
				queryClientState: dehydrate(queryClient),
			};
		},

		hydrate: (dehydrated) => {
			hydrate(queryClient, dehydrated.queryClientState);
		},
	});

	return router;
};

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
