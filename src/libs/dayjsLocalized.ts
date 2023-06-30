import { Dayjs } from "dayjs";

import { dayjs } from "./dayjs-config";
require(`dayjs/locale/de.js`);
require(`dayjs/locale/es.js`);
require(`dayjs/locale/fa.js`);
require(`dayjs/locale/fr.js`);
require(`dayjs/locale/it.js`);
require(`dayjs/locale/ja.js`);
require(`dayjs/locale/zh.js`);
require(`dayjs/locale/ru.js`);
require(`dayjs/locale/tr.js`);


export const dayjsLocalized = (
  jalali: boolean = false,
  date?: string,
  locale = "en",
): Dayjs => {
  try {
  } catch (error) {
    new Error(`This ${locale} Doesn't exist`);
  }

  let source = dayjs(date)
    .calendar(jalali ? "jalali" : "gregory")
    .locale(jalali ? "fa" : locale ? locale : "en");
  return source;
};
