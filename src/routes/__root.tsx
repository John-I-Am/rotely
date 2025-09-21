/// <reference types="vite/client" />

import "@mantine/core/styles.css";

import { MantineProvider, mantineHtmlProps } from "@mantine/core";
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
				<MantineProvider theme={theme}> {children} </MantineProvider>
				<Scripts />
			</body>
		</html>
	);
};

const RootComponent = () => {
	return (
		<RootDocument>
			<Outlet />
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
