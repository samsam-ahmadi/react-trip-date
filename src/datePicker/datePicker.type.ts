import { Dayjs } from "dayjs";

export type DatePickerType = {
  jalali?: boolean;
};

export type DatePickerOnChange = (days: string[]) => void;

export type ResponsiveHandler = (howManyDoYouWantToShow: any) => boolean;

export interface DatePickerProps {
  dayComponent?: React.FC<{ day: Dayjs }>;
  numberOfSelectableDays?: number;
  disabledBeforeToday?: boolean;
  disabledDays?: string[];
  disabled?: boolean;
  jalali?: boolean;
  startOfWeek?: number;
  selectedDays?: string[];
  numberOfMonths?: number;
  onChange: DatePickerOnChange;
  responsive?: ResponsiveHandler;
}
