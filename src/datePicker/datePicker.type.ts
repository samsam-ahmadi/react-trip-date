import { DefaultTheme } from "styled-components";
import { ElementType } from "react";

export type DatePickerType = {
  jalali?: boolean;
};

export type DatePickerOnChange = (days: string[]) => void;

export type ResponsiveHandler = (howManyDoYouWantToShow: any) => boolean;

export type DatePickerComponents = {
  days?: ElementType<{ day: string; jalali: boolean }>;
  header?: {
    format?: string;
  };
  titleOfWeek?: {
    titles?: string[];
    wrapper?: ElementType<{ jalali: boolean }>;
  };
};
export interface DatePickerProps {
  autoResponsive?: boolean;
  theme?: DeepPartial<DefaultTheme>;
  numberOfSelectableDays?: number;
  disabledBeforeToday?: boolean;
  disabledBeforeDate?: string;
  disabledAfterDate?: string;
  disabledDays?: string[];
  jalali?: boolean;
  components?: DatePickerComponents;
  disabled?: boolean;
  startOfWeek?: number;
  selectedDays?: string[];
  numberOfMonths?: number;
  onChange: DatePickerOnChange;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
