import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
	return <div>Hello "/app/dashboard"!</div>;
};

export const Route = createFileRoute("/app/dashboard")({
	component: RouteComponent,
});
