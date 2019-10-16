import React from 'react';

export type HandleChange = (result: {
  startDate: string;
  endDate: string;
}) => void;

export type ResponsiveChange = (result: any) => void;

export interface CalendarProps {
  jalali?: boolean;
  numberOfMonths?: number;
  handleChange?: HandleChange;
  disabled?: boolean;
  hoverable?: boolean;
  selectedDays?: any;
  disabledDays?: string[];
  responsive?: ResponsiveChange;
  dayComponent?:
    | React.FunctionComponent<{ day: any }>
    | React.Component<{ day: any }>
    | undefined;
  titleComponent?:
    | React.FunctionComponent<{ source: any }>
    | React.Component<{ source: any }>
    | undefined;
  disabledBeforToday?: boolean;
}

export type selectedDate = {
  from: string;
  to: string;
};

export interface DayProps {
  day: any;
  month: number;
}

// multiple select

export type DatePickerHandleChange = (days: string[]) => void;

export interface DatePickerProps {
  jalali?: boolean;
  numberOfMonths?: number;
  handleChange?: DatePickerHandleChange;
  selectedDays?: string[];
  numberOfSelectableDays?: number;
  disabledDays?: string[];
  responsive?: ResponsiveChange;
  disabled?: boolean;
  dayComponent?:
    | React.FunctionComponent<{ day: any }>
    | React.Component<{ day: any }>
    | undefined;
  titleComponent?:
    | React.FunctionComponent<{ source: any }>
    | React.Component<{ source: any }>
    | undefined;
  disabledBeforToday?: boolean;
}

export interface DatePickerDayProps {
  day: any;
  month: number;
}

export interface TitleOfWeekProps {
  jalali: boolean;
}
