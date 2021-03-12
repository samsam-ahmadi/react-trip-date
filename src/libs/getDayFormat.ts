import { Dayjs } from "dayjs";

import { dayjs } from "./dayjs-config";

export const getDayFormat = (day: Dayjs, jalali?: boolean) => {
  return dayjs(day, { jalali: jalali, format: "YYYY-MM-DD" })
    .calendar("gregory")
    .format("YYYY-MM-DD");
};
