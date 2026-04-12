import { Paper, Stack, Text } from "@mantine/core";
import { Calendar } from "@/features/insights/components/Calendar/Calendar";
import dayjs from "@/lib/dayjs";

export const StreakDisplay = () => {
	return (
		<Paper>
			<Stack>
				<Text fw={600}>Weekly Activity</Text>
				<Calendar startOfWeek={dayjs().startOf("isoWeek").toDate()} />
			</Stack>
		</Paper>
	);
};
