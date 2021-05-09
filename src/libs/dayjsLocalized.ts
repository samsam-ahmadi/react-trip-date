import { Dayjs } from "dayjs";

import { dayjs } from "./dayjs-config";

export const dayjsLocalized = (
  jalali: boolean = false,
  date?: string,
): Dayjs => {
  let source = dayjs(date)
    .calendar(jalali ? "jalali" : "gregory")
    .locale(jalali ? "fa" : "en");
  return source;
};
