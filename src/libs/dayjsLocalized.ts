import { Dayjs } from "dayjs";

import { dayjs } from "./dayjs-config";

export const dayjsLocalized = (
  jalali: boolean = false,
  date?: string,
  locale: string = "en",
): Dayjs => {
  return dayjs(date)
    .calendar(jalali ? "jalali" : "gregory")
    .locale(jalali ? "fa" : locale || "en");
};
