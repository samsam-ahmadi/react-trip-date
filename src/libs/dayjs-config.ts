import _dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import jalaliPlugin from "@zoomit/dayjs-jalali-plugin";

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
