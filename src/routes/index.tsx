import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/IndexComponents/Header/Header";

const Home = () => {
	return (
		<>
			<Header />
			<Button>GO TO APP</Button>
		</>
	);
};

export const Route = createFileRoute("/")({
	component: Home,
});
