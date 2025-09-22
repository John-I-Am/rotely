import { Button, Text } from "@mantine/core";
import { createFileRoute, useRouter } from "@tanstack/react-router";

const Home = () => {
	const router = useRouter();
	const state = Route.useLoaderData();

	return (
		<>
			<Text>THIS IS MY HOME PAGE</Text>
			<Button>GO TO APP</Button>
		</>
	);
};

export const Route = createFileRoute("/")({
	component: Home,
});
