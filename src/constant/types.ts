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
    wrapper?: ElementType<{ jalali: boolean; startOfWeek: number }>;
  };
};

export interface InitialProps {
  autoResponsive?: boolean;
  dayClasses?: (day: Dayjs) => string[];
  disabled?: boolean;
  disabledBeforeToday?: boolean;
  disabledBeforeDate?: string;
  disabledAfterDate?: string;
  disabledDays?: string[];
  initialMonthAndYear?: string;
  jalali?: boolean;
  locale?: "en" | "de" | "es" |"fa" |"fr" |"it" | "ja"| "zh"| "ru"| "tr";
  numberOfMonths?: number;
  onRangeDateInScreen?: DatePickerWindowUpdated;
  startOfWeek?: number;
  theme?: DeepPartial<DefaultTheme>;
}

type DatePickerWindow = { start: string; end: string };

type DatePickerWindowUpdated = (window: DatePickerWindow) => void;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
