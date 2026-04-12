import { Stack, Text } from "@mantine/core";
import {
	Calendar as CalendarComponent,
	type DatePickerProps,
} from "@mantine/dates";
import { modals } from "@mantine/modals";
import { useSuspenseQuery } from "@tanstack/react-query";
import cx from "clsx";
import type { OpUnitType } from "dayjs";
import dayjs from "@/lib/dayjs";
import { allUserActivitiesQueryOptions } from "../../api/fetchUserActivity";
import classes from "./Calendar.module.css";

type CalendarProps = { month?: Date; startOfWeek?: Date };

export const Calendar = ({ month, startOfWeek }: CalendarProps) => {
	const dayRenderer: DatePickerProps["renderDay"] = (date: string) => {
		const { data: allUserActivities } = useSuspenseQuery(
			allUserActivitiesQueryOptions(),
		);

		// maps date to index of entry in allUserActivities for easier / faster querying
		const dateToIndexMap = new Map();
		for (let i = 0; i < allUserActivities.length; i++) {
			dateToIndexMap.set(
				dayjs(allUserActivities[i].date).format("YYYY-MM-DD"),
				i,
			);
		}

		return (
			<Stack
				align="center"
				className={classes["day-wrapper"]}
				onClick={() => {
					if (dayjs(date).isSameOrBefore(new Date())) {
						modals.openContextModal({
							modal: "dayOverview",
							title: (
								<Text>
									<span className={classes["modal-day-label"]}>
										{dayjs(date).format("dddd")}{" "}
									</span>
									<span> {dayjs(date).format("D MMMM")} </span>
								</Text>
							),
							innerProps: {
								userActivity: dateToIndexMap.has(date)
									? allUserActivities[dateToIndexMap.get(date)]
									: null,
							},
						});
					}
				}}
			>
				<div
					className={cx(classes.day, {
						[classes.reviewed]:
							dateToIndexMap.has(date) &&
							allUserActivities[dateToIndexMap.get(date)].reviewedCards
								.length !== 0,
						[classes["goal-reached"]]: // not enabled in css yet, waiting to refactor to to real icon
							dateToIndexMap.has(date) &&
							allUserActivities[dateToIndexMap.get(date)].reviewedCards
								.length >= allUserActivities[dateToIndexMap.get(date)].goal,
					})}
				>
					<span />
				</div>
				<Text
					fz="xs"
					px="6px"
					py="2px"
					className={cx({
						[classes["day-current"]]: dayjs(date).isSame(dayjs(), "day"),
					})}
				>
					{dayjs(date).format("ddd")}
				</Text>
			</Stack>
		);
	};

	return (
		<CalendarComponent
			classNames={{
				calendarHeader: startOfWeek
					? classes["header-control"]
					: classes.header,
				calendarHeaderControl: classes["header-control"],
				month: classes.month,
			}}
			defaultDate={month}
			hideOutsideDates
			hideWeekdays
			monthLabelFormat="MMMM"
			renderDay={dayRenderer}
			getDayProps={
				startOfWeek &&
				((date: string) => {
					const isCurrentWeek =
						dayjs(date).isSameOrAfter(startOfWeek, "isoWeek" as OpUnitType) &&
						dayjs(date).isSameOrBefore(
							dayjs(startOfWeek).endOf("isoWeek"),
							"isoWeek" as OpUnitType,
						);

					return {
						hidden: !isCurrentWeek,
					};
				})
			}
		/>
	);
};
