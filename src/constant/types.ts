import { DefaultTheme } from "styled-components";
import { ElementType, ReactNode } from "react";
import { Dayjs } from "dayjs";

type HeaderIconsPosition = {
  right: ReactNode;
  left: ReactNode;
};

export type InitialComponents = {
  days?: ElementType<{
    day: string;
    jalali: boolean;
  }>;
  header?: {
    format?: string;
    monthIcons?: HeaderIconsPosition;
    yearIcons?: HeaderIconsPosition;
  };
  titleOfWeek?: {
    titles?: string[];
    wrapper?: ElementType<{ jalali: boolean; startOfWeek: number; }>;
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
  dayClasses?: (day: Dayjs) => string[];
}

type DatePickerWindow = { start: string; end: string };

type DatePickerWindowUpdated = (window: DatePickerWindow) => void;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
