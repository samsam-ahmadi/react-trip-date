import _dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import jalaliday from "jalaliday";

_dayjs.extend(jalaliday);
_dayjs.extend(isBetween);
_dayjs.extend(isSameOrBefore);
const dayjs = _dayjs;

export { dayjs };
