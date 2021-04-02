import { Dayjs } from "dayjs";

const createCalendar = ({
  source,
  startOfWeek,
}: CreateCalendarType): Dayjs[] => {
  let days: Dayjs[] = [];
  const daysInMonth = source.daysInMonth();
  const firstDay = source.startOf("month").day();

  let shift =
    firstDay + startOfWeek === 7
      ? 0
      : firstDay + startOfWeek < 7
      ? firstDay + startOfWeek
      : 7 - firstDay + startOfWeek;

  let tmpDay = source.startOf("month").subtract(shift, "day");
  let totalDays = daysInMonth + shift;
  let remaining = totalDays % 7;
  for (let i = 0; i < totalDays + (remaining > 0 ? 7 - remaining : 0); i++) {
    days.push(tmpDay);
    tmpDay = tmpDay.add(1, "day");
  }
  return days;
};

export { createCalendar };

interface CreateCalendarType {
  source: Dayjs;
  startOfWeek: number;
}
