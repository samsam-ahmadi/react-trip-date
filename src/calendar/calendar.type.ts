import { Dayjs } from "dayjs";

export interface CalendarProps {
  source?: Dayjs;
  jalali: boolean;
  startOfWeek?: number;
  children(data: Dayjs[][]): any;
}
