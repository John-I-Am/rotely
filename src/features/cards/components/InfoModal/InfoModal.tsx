import { Divider, Group, Stack, Text } from "@mantine/core";
import { LevelIndicator } from "../LevelDisplay/LevelDisplay";

export const InfoModal = () => {
	return (
		<Stack>
			<Text ta="center">
				The Rotely algorithm uses spaced repetition, showing you the cards you
				need to practise more often, so the above scale can go up as well as
				down over time.
			</Text>
			<Text ta="center">
				Make sure to practise as often as you can, and always try your best to
				get the answer correct.
			</Text>
			<Divider />
			<Stack p={"lg"}>
				<Group>
					<LevelIndicator level={5} />
					<Text fz={"sm"} fw={600}>
						Maximum memory strength!
					</Text>
				</Group>
				<Group>
					<LevelIndicator level={4} />
					<Text fz={"sm"} fw={600}>
						On the tip of your tongue!
					</Text>
				</Group>
				<Group>
					<LevelIndicator level={3} />
					<Text fz={"sm"} fw={600}>
						On the way to learning this card.
					</Text>
				</Group>
				<Group>
					<LevelIndicator level={2} />
					<Text fz={"sm"} fw={600}>
						This card needs more practice.
					</Text>
				</Group>
				<Group>
					<LevelIndicator level={1} />
					<Text fz={"sm"} fw={600}>
						Weakest memory strength.
					</Text>
				</Group>
			</Stack>
		</Stack>
	);
};
