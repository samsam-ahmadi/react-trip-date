import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import jalaliday from 'jalaliday';

dayjs.extend(jalaliday);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
const _dayjs = dayjs;
export { _dayjs };
