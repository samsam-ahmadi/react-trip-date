import { Dayjs } from "dayjs";

import "dayjs/locale/de";
import "dayjs/locale/es";
import "dayjs/locale/fa";
import "dayjs/locale/fr";
import "dayjs/locale/it";
import "dayjs/locale/ja";
import "dayjs/locale/ru";
import "dayjs/locale/tr";
import "dayjs/locale/zh";

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
