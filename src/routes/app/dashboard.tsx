import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
	return <div style={{ border: "1px solid red" }}>Hello "/app/dashboard"!</div>;
};

export const Route = createFileRoute("/app/dashboard")({
	component: RouteComponent,
});
