import { Badge, Box, Container, Group, Text } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { FlashCard } from "@/features/cards/components/FlashCard/FlashCard";
import { Header } from "./-components/index/Header/Header";
import classes from "./-index.module.css";

const Home = () => {
	return (
		<Container w="100%">
			<Header />
			<Group justify="end" pt="10%" pb="xl" mr="lg">
				<Badge size={"1rem"} p="lg" color="indigo.9">
					under active development
				</Badge>
			</Group>

			<Group justify="center">
				<Box className={classes.flashcard}>
					<FlashCard
						id={""}
						level={1}
						front={
							(
								<Text
									size="xl"
									fw={700}
									fz={"5rem"}
									variant="gradient"
									gradient={{ from: "blue", to: "grape", deg: 127 }}
								>
									Rote-ly
								</Text>
							) as any
						}
						back={"to do something habitually"}
					/>
				</Box>
			</Group>
		</Container>
	);
};

export const Route = createFileRoute("/")({
	component: Home,
});
