/**
 * dayjs is configured here once for the entire library.
 *
 * Two ordering constraints have to be respected, in this order:
 *
 *   1. Locale modules (`dayjs/locale/*`) must register themselves on
 *      `dayjs.Ls` BEFORE `dayjs.extend(jalaliPlugin)` runs.
 *   2. Each locale module is imported via a default-binding so the
 *      bundler keeps the module in the graph and its registration
 *      side-effect actually executes; bare `import "dayjs/locale/X"`
 *      forms get tree-shaken in production.
 *
 * Why the order matters: the jalali plugin's `extend` callback re-
 * registers the `fa` locale merged with its Persian-calendar
 * `jmonths` array. If a `dayjs/locale/fa.js` registration ran later,
 * it would overwrite the augmented entry and strip `jmonths`, and
 * `format("MMMM")` on a Jalali date would crash with
 * "Cannot read properties of undefined (reading '2')".
 */
import jalaliPlugin from "@zoomit/dayjs-jalali-plugin";
import _dayjs from "dayjs";
import deLocale from "dayjs/locale/de";
import esLocale from "dayjs/locale/es";
import faLocale from "dayjs/locale/fa";
import frLocale from "dayjs/locale/fr";
import itLocale from "dayjs/locale/it";
import jaLocale from "dayjs/locale/ja";
import ruLocale from "dayjs/locale/ru";
import trLocale from "dayjs/locale/tr";
import zhLocale from "dayjs/locale/zh";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

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
if (REGISTERED_LOCALES.length === 0) {
  throw new Error("react-trip-date: locale registration failed.");
}

_dayjs.extend(jalaliPlugin);
_dayjs.extend(isBetween);
_dayjs.extend(isSameOrBefore);

const dayjs: (
  date?: _dayjs.ConfigType,
  format?:
    | string
    | {
        locale?: string;
        format?: string;
        utc?: boolean;
        jalali?: boolean;
      }
    | string[],
  strict?: boolean,
) => _dayjs.Dayjs = _dayjs;

export { dayjs };
