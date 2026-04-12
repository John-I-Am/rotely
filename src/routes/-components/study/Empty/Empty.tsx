import { BackgroundImage, Button, Stack, Text } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import classroom from "@/assets/classroom.svg";
import { IconWrapper } from "@/components/IconWrapper/IconWrapper";

export const Empty = () => {
	return (
		<Stack h="100vh" w="100%">
			<BackgroundImage h="100%" radius="xl" src={classroom}>
				<Button
					m={"xl"}
					component={Link}
					to={"/app/dashboard"}
					leftSection={<IconWrapper icon={IconChevronLeft} />}
				>
					Back To Dashboard
				</Button>
				<Text
					ta="center"
					size="xl"
					fw={700}
					variant="gradient"
					gradient={{ from: "orange", to: "white", deg: 60 }}
				>
					Great job! You've reviewed every card in this deck!
				</Text>
			</BackgroundImage>
		</Stack>
	);
};
