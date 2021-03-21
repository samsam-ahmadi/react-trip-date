import { DefaultTheme } from "styled-components";
import { ElementType } from "react";

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

export type RangePickerComponents = {
  days?: ElementType<{
    day: string;
    jalali: boolean;
  }>;
  header?: {
    format?: string;
  };
  titleOfWeek?: {
    titles?: string[];
    wrapper?: ElementType<{ jalali: boolean }>;
  };
};

export interface RangePickerProps {
  disabledBeforeToday?: boolean;
  disabledDays?: string[];
  disabled?: boolean;
  jalali?: boolean;
  theme?: DefaultTheme;
  components?: RangePickerComponents;
  startOfWeek?: number;
  selectedDays?: RangePickerSelectedDays;
  numberOfMonths?: number;
  autoResponsive?: boolean;
  onChange: RangePickerOnChange;
}
