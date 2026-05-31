import { Dayjs } from "dayjs";

import { CalendarProps } from "./calendar.type";
import { createCalendar } from "../libs/createCalendar";
import { dayjs } from "../libs/dayjs-config";
import { sliceDaysOfMonthToWeeks } from "../libs/sliceDaysOfMonthToWeeks";

export const Calendar = ({
  jalali,
  startOfWeek = 1,
  children,
}: CalendarProps) => {
  const source = dayjs().calendar(jalali ? "jalali" : "gregory");
  const weeks: Dayjs[][] = sliceDaysOfMonthToWeeks(
    createCalendar({
      source,
      startOfWeek: jalali ? 6 : startOfWeek,
    }),
    7,
  );
  return <>{children(weeks)}</>;
};
