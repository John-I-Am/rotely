/// <reference types="vite/client" />

import "@mantine/core/styles.css";
import "@/styles.css";

import { MantineProvider, mantineHtmlProps } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";

import type { ReactNode } from "react";
import { GoalSliderModal } from "@/components/GoalSliderModal/GoalSliderModal";
import { ProgressModal } from "@/components/ProgressModal/ProgressModal";
import { InfoModal } from "@/features/cards/components/InfoModal/InfoModal";
import { DayOverviewModal } from "@/features/insights/components/DayOverviewModal/DayOverviewModal";
import { queryClient } from "@/lib/query/queryClient";
import type { RouterContext } from "@/router";
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
	return (
		<RootDocument>
			<QueryClientProvider client={queryClient}>
				<MantineProvider theme={theme}>
					<ModalsProvider
						modals={{
							cardInfo: InfoModal,
							goalSlider: GoalSliderModal,
							progressInfo: ProgressModal,
							dayOverview: DayOverviewModal,
						}}
						labels={{ confirm: "Delete", cancel: "Cancel" }}
					>
						<Outlet />
					</ModalsProvider>
				</MantineProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</RootDocument>
	);
};

export const Route = createRootRouteWithContext<RouterContext>()({
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
				title: "Rotely",
			},
		],
	}),
	component: RootComponent,
	notFoundComponent: () => {
		return (
			<p>This is a placeholder root notFoundComponent to slience errors</p>
		);
	},
});
