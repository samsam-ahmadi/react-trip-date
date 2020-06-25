import { Dayjs } from 'dayjs';

const createCalendar = ({
  source,
  daysInMonth,
  firstDay,
  startOfWeek,
}: CreateCalendarType): Dayjs[] => {
  let days: Dayjs[] = [];
  let shift =
    firstDay === startOfWeek
      ? 0
      : firstDay + (startOfWeek === 0 ? 0 : 7 - startOfWeek);
  let tmpDay = source.startOf('month').subtract(shift, 'day');
  let totalDays = daysInMonth + shift;
  let remaining = totalDays % 7;
  for (let i = 0; i < totalDays + (remaining > 0 ? 7 - remaining : 0); i++) {
    days.push(tmpDay);
    tmpDay = tmpDay.add(1, 'day');
  }
  return days;
};

export { createCalendar };

interface CreateCalendarType {
  source: Dayjs;
  daysInMonth: number;
  firstDay: number;
  startOfWeek: number;
}
