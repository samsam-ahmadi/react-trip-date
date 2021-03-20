import { DefaultTheme } from "styled-components";

export type RangePickerType = {
  jalali?: boolean;
};

export type RangePickerOnChange = (
  selectedDays: RangePickerSelectedDays,
) => void;

export type RangePickerSelectedDays = {
  from: string;
  to: string;
};
export interface RangePickerProps {
  disabledBeforeToday?: boolean;
  disabledDays?: string[];
  disabled?: boolean;
  jalali?: boolean;
  theme?: DefaultTheme;
  startOfWeek?: number;
  selectedDays?: RangePickerSelectedDays;
  numberOfMonths?: number;
  autoResponsive?: boolean;
  onChange: RangePickerOnChange;
}
