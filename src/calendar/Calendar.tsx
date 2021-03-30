import { Dayjs } from "dayjs";
import { ReactElement } from "react";
import { createCalendar } from "libs/createCalendar";
import { dayjs } from "libs/dayjs-config";
import { sliceDaysOfMonthToWeeks } from "libs/sliceDaysOfMonthToWeeks";

import { CalendarProps } from "./calendar.type";

export const Calendar: React.FC<CalendarProps> = ({
  jalali,
  startOfWeek = 1,
  children,
}): ReactElement => {
  let source = dayjs();
  let daysInMonth = source.daysInMonth(),
    firstDay = source.startOf("month").day();
  if (source.get("day") === 0) {
    source = source.add(1, "day");
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
