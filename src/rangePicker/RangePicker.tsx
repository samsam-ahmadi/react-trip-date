import { useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";

import { Header } from "../components";
import { Months } from "./Months";
import { DisplayMonths } from "../components/DisplayMonths";
import { theme } from "../constant";
import { RangePickerProps, RangePickerSelectedDays } from "./rangePicker.type";
import { deepMerge } from "../libs/mergeObjects";
import { useCalendarController } from "../libs/useCalendarController";
import { useControlled } from "../libs/useControlled";

const EMPTY_RANGE: RangePickerSelectedDays = { from: "", to: "" };

export const RangePicker = ({
  autoResponsive = true,
  allowDisabledDaysSpan = false,
  components,
  disabled = false,
  dayClasses,
  disabledAfterDate,
  disabledBeforeToday = false,
  disabledBeforeDate,
  disabledDays = [],
  initialMonthAndYear,
  jalali = false,
  locale,
  numberOfMonths: numberOfMonthsProp = 1,
  onChange,
  onRangeDateInScreen,
  selectedDays: selectedDaysProp,
  startOfWeek = 1,
  theme: themeProp,
}: RangePickerProps) => {
  const [selectedDays, setSelectedDays] =
    useControlled<RangePickerSelectedDays>(
      selectedDaysProp,
      selectedDaysProp ?? EMPTY_RANGE,
      onChange,
    );
  const [hoverDay, setHoverDay] = useState<string>();

  const initialFocusDate =
    !initialMonthAndYear && selectedDays?.from ? selectedDays.from : undefined;

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
    ? (deepMerge({ ...theme }, themeProp) as DefaultTheme)
    : (theme as DefaultTheme);

  return (
    <div
      className="tp-calendar"
      ref={ref}
      role="group"
      aria-label="Date range picker"
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
            hoverDay={hoverDay}
            components={components}
            setHoverDay={setHoverDay}
            startOfWeek={startOfWeek}
            disabledDays={disabledDays}
            selectedDays={selectedDays}
            numberOfMonths={numberOfMonths}
            setSelectedDays={setSelectedDays}
            disabledBeforeToday={disabledBeforeToday}
            disabledBeforeDate={disabledBeforeDate}
            disabledAfterDate={disabledAfterDate}
            allowDisabledDaysSpan={allowDisabledDaysSpan}
            dayClasses={dayClasses}
          />
        )}
      </ThemeProvider>
    </div>
  );
};
