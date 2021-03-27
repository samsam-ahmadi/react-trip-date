import { Dayjs } from "dayjs";

import { dayjs } from "./dayjs-config";

export const dayjsLocalized = (
  jalali: boolean = false,
  date?: string,
): Dayjs => {
  let source = dayjs(date)
    .calendar(jalali ? "jalali" : "gregory")
    .locale(jalali ? "fa" : "en");
  if (source.get("day") === 0) {
    source = source.add(1, "day");
  }
  return source;
};
