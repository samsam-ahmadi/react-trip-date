import { DefaultTheme } from "styled-components";
import { ElementType } from "react";

export type InitialComponents = {
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

export interface InitialProps {
  autoResponsive?: boolean;
  theme?: DeepPartial<DefaultTheme>;
  disabledBeforeToday?: boolean;
  disabledBeforeDate?: string;
  disabledAfterDate?: string;
  disabledDays?: string[];
  jalali?: boolean;
  disabled?: boolean;
  startOfWeek?: number;
  numberOfMonths?: number;
  initialMonthAndYear?: string;
  onRangeDateInScreen?: DatePickerWindowUpdated;
}

type DatePickerWindow = { start: string; end: string };

type DatePickerWindowUpdated = (window: DatePickerWindow) => void;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
