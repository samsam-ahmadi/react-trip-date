import { DefaultTheme } from "styled-components";

export type DatePickerType = {
  jalali?: boolean;
};

export type DatePickerOnChange = (days: string[]) => void;

export type ResponsiveHandler = (howManyDoYouWantToShow: any) => boolean;

export interface DatePickerProps {
  autoResponsive?: boolean;
  theme?: DefaultTheme;
  numberOfSelectableDays?: number;
  disabledBeforeToday?: boolean;
  disabledDays?: string[];
  jalali?: boolean;
  disabled?: boolean;
  startOfWeek?: number;
  selectedDays?: string[];
  numberOfMonths?: number;
  onChange: DatePickerOnChange;
}
