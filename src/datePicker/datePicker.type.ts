export type DatePickerType = {
  jalali?: boolean;
};

export type DatePickerOnChange = (days: string[]) => void;

export type ResponsiveHandler = (howManyDoYouWantToShow: any) => boolean;

export interface DatePickerProps {
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
