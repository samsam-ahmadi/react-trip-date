import { Dayjs } from "dayjs";
import { ReactNode } from "react";

export interface CalendarProps {
  jalali: boolean;
  startOfWeek?: number;
  children: (weeks: Dayjs[][]) => ReactNode;
}
