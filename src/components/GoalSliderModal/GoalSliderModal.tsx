import { Box, Slider, Stack, Text } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { userActivityQueryOptions } from "@/features/insights/api/fetchUserActivity";
import { useCreateUserActivityMutation } from "@/features/insights/api/upsertUserActivity";

export const GoalSliderModal = () => {
	const { data: currentSession } = useSuspenseQuery(userActivityQueryOptions());
	const [value, setValue] = useState(currentSession.goal);

	const { mutate } = useCreateUserActivityMutation();

	const handleUpdate = () => {
		mutate({ goal: value });
	};

	return (
		<Stack>
			<Text size="xl" ta={"center"} mb={-16} c={"indigo"}>
				{value} Cards
			</Text>

			{value === 50 ? (
				<Box h={32}>
					<Text c="dimmed" ta={"center"}>
						Recommended
					</Text>{" "}
				</Box>
			) : (
				<Box h={32} />
			)}

			<Slider
				domain={[0, 200]}
				min={10}
				max={200}
				label={null}
				value={value}
				onChange={setValue}
				onChangeEnd={handleUpdate}
				marks={[
					{ value: 10, label: "10" },
					{ value: 50, label: "50" },
					{ value: 200, label: "200" },
				]}
			/>

			<Text pt={32}>
				For best results, try to learn every day. 50 cards would be ideal, but
				even 10 cards on tough days can help create a healthy learning habit.
			</Text>
		</Stack>
	);
};
