import { Dayjs } from "dayjs";

export interface CalendarProps {
  jalali: boolean;
  startOfWeek?: number;
  children(data: Dayjs[][]): any;
}
