import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
	return <div>Hello "/app/settings"!</div>;
};

export const Route = createFileRoute("/app/settings")({
	component: RouteComponent,
});
