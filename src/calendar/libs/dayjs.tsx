import dayjs, { Dayjs } from 'dayjs';
import jalaliday from 'jalaliday';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(jalaliday);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

export const dayjsLocalized = (jalali: boolean, date?: string): Dayjs => {
  if (date) {
    return (dayjs(date) as any)
      .calendar(jalali ? 'jalali' : 'gregory')
      .locale(jalali ? 'fa' : 'en');
  }
  return (dayjs() as any)
    .calendar(jalali ? 'jalali' : 'gregory')
    .locale(jalali ? 'fa' : 'en');
};

export default dayjs;
