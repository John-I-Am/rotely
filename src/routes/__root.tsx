/// <reference types="vite/client" />

import "@mantine/core/styles.css";
import "@/styles.css";

import { MantineProvider, mantineHtmlProps } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";

import type { ReactNode } from "react";
import { theme } from "@/theme";

const RootDocument = ({ children }: Readonly<{ children: ReactNode }>) => {
	return (
		<html {...mantineHtmlProps}>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
};

const RootComponent = () => {
	const queryClient = new QueryClient();
	return (
		<RootDocument>
			<QueryClientProvider client={queryClient}>
				<MantineProvider theme={theme}>
					<Outlet />
				</MantineProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</RootDocument>
	);
};

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
	}),
	component: RootComponent,
});
