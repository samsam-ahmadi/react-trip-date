import { _dayjs } from 'libs/dayjs-config';
import { Dayjs } from 'dayjs';
import { ReactElement } from 'react';
import { createCalendar } from 'libs/createCalendar';
import { sliceDaysOfMonthToWeeks } from 'libs/sliceDaysOfMonthToWeeks';

interface CalendarProps {
  source?: Dayjs;
  jalali: boolean;
  startOfWeek?: number;
  children(data: Dayjs[][]): any;
}

const Calendar: React.FC<CalendarProps> = ({
  source = _dayjs(),
  jalali,
  startOfWeek = 1,
  children,
}): ReactElement => {
  let daysInMonth = source.daysInMonth(),
    firstDay = source.startOf('month').day();
  if (source.get('day') === 0) {
    source = source.add(1, 'day');
  }
  let weeksDays: Dayjs[][] = sliceDaysOfMonthToWeeks(
    createCalendar({
      source: source,
      daysInMonth: daysInMonth,
      firstDay: firstDay,
      startOfWeek: jalali ? 6 : startOfWeek,
    }),
    7,
  );
  return children(weeksDays);
};
export { Calendar };
