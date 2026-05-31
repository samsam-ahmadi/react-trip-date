import { Dayjs } from "dayjs";
// Each `dayjs/locale/*` file is a side-effect module that registers
// itself on the global `dayjs.Ls` table. Bare `import "dayjs/locale/X"`
// statements get tree-shaken by Vite/Rollup in production builds
// because the import binding is never used. Importing each one as a
// value and parking the values in an array tells the bundler the
// imports are reachable, so the registration side-effect actually runs.
import deLocale from "dayjs/locale/de";
import esLocale from "dayjs/locale/es";
import faLocale from "dayjs/locale/fa";
import frLocale from "dayjs/locale/fr";
import itLocale from "dayjs/locale/it";
import jaLocale from "dayjs/locale/ja";
import ruLocale from "dayjs/locale/ru";
import trLocale from "dayjs/locale/tr";
import zhLocale from "dayjs/locale/zh";

import { dayjs } from "./dayjs-config";

const REGISTERED_LOCALES = [
  deLocale,
  esLocale,
  faLocale,
  frLocale,
  itLocale,
  jaLocale,
  ruLocale,
  trLocale,
  zhLocale,
];
// Touch the array so the imports above are observed as used by the
// bundler's static analyzer. The check is always true at runtime; the
// purpose is purely to defeat tree-shaking.
if (REGISTERED_LOCALES.length === 0) {
  throw new Error("react-trip-date: locale registration failed.");
}

export const dayjsLocalized = (
  jalali: boolean = false,
  date?: string,
  locale: string = "en",
): Dayjs => {
  return dayjs(date)
    .calendar(jalali ? "jalali" : "gregory")
    .locale(jalali ? "fa" : locale || "en");
};
