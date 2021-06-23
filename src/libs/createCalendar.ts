import { Dayjs } from "dayjs";

const createCalendar = ({
  source,
  startOfWeek,
}: CreateCalendarType): Dayjs[] => {
  let days: Dayjs[] = [];
  const daysInMonth = source.daysInMonth();
  const firstDay = source.startOf("month").day();

  let sow = startOfWeek < 0 ? 0 : startOfWeek % 7;
  let shift = 0;
  if (firstDay > sow) shift = firstDay - sow;
  else if (sow > firstDay) shift = 7 - (sow - firstDay);

  let tmpDay = source.startOf("month").subtract(shift, "day");
  let totalDays = daysInMonth + shift;
  let remaining = totalDays % 7;
  if (remaining > 0) totalDays += 7 - remaining;
  for (let i = 0; i < totalDays; i++) {
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
