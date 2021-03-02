import { Dayjs } from 'dayjs';

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
  numberOfMonths?: number;
  startOfWeek?: number;
  selectedDays?: string[];
  onChange?: DatePickerOnChange;
  responsive?: ResponsiveHandler;
}
