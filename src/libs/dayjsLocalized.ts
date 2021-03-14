import { Dayjs } from "dayjs";

import { dayjs } from "./dayjs-config";

export const dayjsLocalized = (jalali: boolean = false): Dayjs => {
  let source = dayjs()
    .calendar(jalali ? "jalali" : "gregory")
    .locale(jalali ? "fa" : "en");
  if (source.get("day") === 0) {
    source = source.add(1, "day");
  }
  return source;
};
