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
  jalali?: boolean;
  startOfWeek?: number;
  selectedDays?: RangePickerSelectedDays;
  numberOfMonths?: number;
  disabled?: boolean;
  onChange: RangePickerOnChange;
}
