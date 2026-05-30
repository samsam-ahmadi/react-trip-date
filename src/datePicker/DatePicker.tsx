import { DefaultTheme, ThemeProvider } from "styled-components";

import { Header } from "../components";
import { DatePickerProps } from "./datePicker.type";
import { DisplayMonths } from "../components/DisplayMonths";
import { theme } from "../constant";
import { Months } from "./Months";
import { deepMerge } from "../libs/mergeObjects";
import { useCalendarController } from "../libs/useCalendarController";
import { useControlled } from "../libs/useControlled";

export const DatePicker = ({
  autoResponsive = true,
  components,
  dayClasses,
  disabled = false,
  disabledBeforeToday = false,
  disabledAfterDate,
  disabledBeforeDate,
  disabledDays = [],
  initialMonthAndYear,
  jalali = false,
  locale,
  numberOfMonths: numberOfMonthsProp = 1,
  numberOfSelectableDays = 0,
  onChange,
  onRangeDateInScreen,
  selectedDays: selectedDaysProp,
  startOfWeek = 1,
  theme: themeProp,
}: DatePickerProps) => {
  const [selectedDays, setSelectedDays] = useControlled<string[]>(
    selectedDaysProp,
    selectedDaysProp ?? [],
    onChange,
  );

  const initialFocusDate =
    !initialMonthAndYear && selectedDays.length > 0
      ? selectedDays[0]
      : undefined;

  const {
    ref,
    source,
    setSource,
    numberOfMonths,
    displayMonths,
    setDisplayMonths,
  } = useCalendarController({
    autoResponsive,
    initialMonthAndYear,
    jalali,
    locale,
    numberOfMonthsProp,
    onRangeDateInScreen,
    initialFocusDate,
  });

  const mergedTheme = themeProp
    ? (deepMerge(theme, themeProp) as DefaultTheme)
    : (theme as DefaultTheme);

  return (
    <div
      className="tp-calendar"
      ref={ref}
      role="group"
      aria-label="Date picker"
    >
      <ThemeProvider theme={mergedTheme}>
        <Header
          jalali={jalali}
          source={source}
          setSource={setSource}
          components={components}
          displayMonths={displayMonths}
          numberOfMonths={numberOfMonths}
          setDisplayMonths={setDisplayMonths}
        />
        {displayMonths ? (
          <DisplayMonths
            jalali={jalali}
            setDisplayMonths={setDisplayMonths}
            setSource={setSource}
            source={source}
          />
        ) : (
          <Months
            source={source}
            jalali={jalali}
            disabled={disabled}
            setSource={setSource}
            components={components}
            startOfWeek={startOfWeek}
            disabledDays={disabledDays}
            selectedDays={selectedDays}
            numberOfMonths={numberOfMonths}
            setSelectedDays={setSelectedDays}
            disabledAfterDate={disabledAfterDate}
            disabledBeforeDate={disabledBeforeDate}
            disabledBeforeToday={disabledBeforeToday}
            numberOfSelectableDays={numberOfSelectableDays}
            dayClasses={dayClasses}
          />
        )}
      </ThemeProvider>
    </div>
  );
};
