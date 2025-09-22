import { createFileRoute, Outlet } from "@tanstack/react-router";

const AppLayoutComponent = () => {
	return (
		<div>
			<h1>App Layout</h1>
			<Outlet />
		</div>
	);
};

export const Route = createFileRoute("/app")({
	component: AppLayoutComponent,
});
