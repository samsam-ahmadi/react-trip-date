import { Dayjs } from "dayjs";

import { dayjs } from "./dayjs-config";

export const dayjsLocalized = (
  jalali: boolean = false,
  date?: string,
  locale = "en",
): Dayjs => {
  try {
    require(`dayjs/locale/${locale}`);
  } catch (error) {
    new Error(`This ${locale} Doesn't exist`);
  }

  let source = dayjs(date)
    .calendar(jalali ? "jalali" : "gregory")
    .locale(jalali ? "fa" : locale ? locale : "en");
  return source;
};
