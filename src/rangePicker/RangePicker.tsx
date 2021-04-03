import { DefaultTheme, ThemeProvider } from "styled-components";
import { DisplayMonths } from "components/DisplayMonths";
import { Header } from "components";
import { dayjsLocalized } from "libs/dayjsLocalized";
import { deepMerge } from "libs/mergeObjects";
import { getDayFormat } from "libs/getDayFormat";
import { theme } from "constant";
import { useEffect, useState } from "react";

import { MonthAndYear, RangePickerProps } from "./rangePicker.type";
import { Months } from "./Months";

const initialDate = (initialMonthAndYear?: MonthAndYear, jalali?: boolean) => {
  const initialDate = dayjsLocalized(jalali);
  if (initialMonthAndYear !== undefined) {
    return initialDate
      .month(initialMonthAndYear.month)
      .year(initialMonthAndYear.year);
  }
  return initialDate;
};

export const RangePicker = ({
  jalali = false,
  startOfWeek = 0,
  numberOfMonths: numberOfMonthsProps = 1,
  disabledDays = [],
  disabledBeforeToday = false,
  disabledBeforeDate,
  disabledAfterDate,
  disabled = false,
  components,
  theme: themeProps,
  autoResponsive = true,
  selectedDays: selectedDaysProps,
  onChange,
  initialMonthAndYear,
  onRangeDateInScreen,
}: RangePickerProps) => {
  const [selectedDays, setSelectedDays] = useState(selectedDaysProps);
  const [hoverDay, setHoverDay] = useState<string>();
  const [displayMonths, setDisplayMonths] = useState(false);
  const [source, setSource] = useState(
    initialDate(initialMonthAndYear, jalali),
  );
  const [numberOfMonths, setNumberOfMonths] = useState(numberOfMonthsProps);

  useEffect(() => {
    if (onRangeDateInScreen) {
      let endDate = source.add(Math.max(0, numberOfMonths - 1), "month");
      endDate = endDate.date(endDate.daysInMonth());
      const startDate = source.date(1);
      onRangeDateInScreen({
        start: getDayFormat(startDate, jalali),
        end: getDayFormat(endDate),
      });
    }
  }, [jalali, numberOfMonths, onRangeDateInScreen, source]);

  useEffect(() => {
    setSource(initialDate(initialMonthAndYear, jalali));
  }, [jalali, initialMonthAndYear]);

  useEffect(() => {
    setSelectedDays(selectedDaysProps);
  }, [selectedDaysProps]);

  useEffect(() => {
    const handleResize = () => {
      let width = document.querySelector(".tp-calendar")!.clientWidth;
      if (width < 580) {
        setNumberOfMonths(1);
      } else {
        setNumberOfMonths(Math.floor(width / 320));
      }
    };

    if (autoResponsive) {
      if (typeof window !== "undefined") {
        window.addEventListener("resize", handleResize);
        handleResize();
      }
    } else {
      setNumberOfMonths(numberOfMonthsProps);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [numberOfMonths, autoResponsive, numberOfMonthsProps]);

  return (
    <div className="tp-calendar">
      <ThemeProvider
        theme={
          themeProps ? (deepMerge(theme, themeProps) as DefaultTheme) : theme
        }
      >
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
            onChange={onChange}
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
          />
        )}
      </ThemeProvider>
    </div>
  );
};
