import { InitialComponents, InitialProps } from "../constant";

export type RangePickerOnChange = (
  selectedDays: RangePickerSelectedDays,
) => void;

export type RangePickerSelectedDays = {
  from: string;
  to: string;
};

export interface RangePickerComponents extends InitialComponents {}

export interface RangePickerProps extends InitialProps {
  components?: RangePickerComponents;
  selectedDays?: RangePickerSelectedDays;
  onChange: RangePickerOnChange;
  allowDisabledDaysSpan?: boolean;
}
