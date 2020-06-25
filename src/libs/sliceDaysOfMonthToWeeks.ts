import { Dayjs } from 'dayjs';

export const sliceDaysOfMonthToWeeks = (days: Dayjs[], len: number) => {
  let i = 0;
  let weeks: Dayjs[][] = [];
  while (i * len < days.length) {
    weeks.push(days.slice(i * len, ++i * len));
  }
  return weeks;
};
