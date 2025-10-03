import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isToday from "dayjs/plugin/isToday";
import utc from "dayjs/plugin/utc";

dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isoWeek);
dayjs.extend(utc);

export default dayjs;
