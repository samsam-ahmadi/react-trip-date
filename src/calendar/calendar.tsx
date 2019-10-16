interface CreateCalendarType {
  source: any;
  daysInMonth: number;
  firstDay: number;
  startOfWeek: number;
}
interface CalendarType {
  source: any;
  jalali: boolean;
  startOfWeek?: number;
  children: any;
}

function createCalendar({
  source,
  daysInMonth,
  firstDay,
  startOfWeek,
}: CreateCalendarType) {
  let days = [];
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
}

let slice = function(arr: any[], len: number) {
  let i = 0;
  let tmp = [];
  while (i * len < arr.length) {
    tmp.push(arr.slice(i * len, ++i * len));
  }
  return tmp;
};

function Calendar({ source, jalali, startOfWeek = 0, children }: CalendarType) {
  let daysInMonth = source.daysInMonth(),
    firstDay = source.startOf('month').day();
  if (source.get('day') === 0) {
    source = source.add(1, 'day');
  }
  let groupedDays: any[] = slice(
    createCalendar({
      source: source,
      daysInMonth: daysInMonth,
      firstDay: firstDay,
      startOfWeek: jalali ? 6 : startOfWeek,
    }),
    7,
  );
  return children(groupedDays);
}
export default Calendar;
