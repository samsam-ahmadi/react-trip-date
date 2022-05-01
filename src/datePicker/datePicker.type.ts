import { InitialComponents, InitialProps } from "../constant";

export type DatePickerOnChange = (days: string[]) => void;

export interface DatePickerComponents extends InitialComponents {}

export interface DatePickerProps extends InitialProps {
  numberOfSelectableDays?: number;
  selectedDays?: string[];
  components?: DatePickerComponents;
  onChange: DatePickerOnChange;
}
