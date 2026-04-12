import dayjs from "@/lib/dayjs";

export const getNextReviewDate = (newLevel: number) => {
	switch (newLevel) {
		case 1:
			return dayjs.utc().add(15, "minute").toDate();
		case 2:
			return dayjs.utc().add(2, "hour").toDate();
		case 3:
			return dayjs.utc().add(8, "hour").toDate();
		case 4:
			return dayjs.utc().add(1, "day").toDate();
		case 5:
			return dayjs.utc().add(3, "day").toDate();
		default:
			return dayjs.utc().toDate();
	}
};
