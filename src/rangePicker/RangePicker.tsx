import { DefaultTheme, ThemeProvider } from "styled-components";
import { DisplayMonths } from "components/DisplayMonths";
import { Header } from "components";
import { dayjsLocalized } from "libs/dayjsLocalized";
import { deepMerge } from "libs/mergeObjects";
import { getDayFormat } from "libs/getDayFormat";
import { theme } from "constant";
import { useEffect, useRef, useState } from "react";

import { Months } from "./Months";
import { RangePickerProps } from "./rangePicker.type";

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
  numberOfMonths: numberOfMonthsProps = 1,
  onChange,
  onRangeDateInScreen,
  selectedDays: selectedDaysProps,
  startOfWeek = 1,
  theme: themeProps,
}: RangePickerProps) => {
  const [selectedDays, setSelectedDays] = useState(selectedDaysProps);
  const [hoverDay, setHoverDay] = useState<string>();
  const [displayMonths, setDisplayMonths] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [source, setSource] = useState(
    dayjsLocalized(jalali, initialMonthAndYear, locale),
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
    if (!initialMonthAndYear && selectedDays?.from) {
      setSource(dayjsLocalized(jalali, selectedDays?.from));
    } else if (initialMonthAndYear) {
      setSource(dayjsLocalized(jalali, initialMonthAndYear));
    }
    // we remove selectedDays  dependency to just run if we have any changes for initialMonthAndYear
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jalali, initialMonthAndYear]);

  useEffect(() => {
    setSelectedDays(selectedDaysProps);
  }, [selectedDaysProps]);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        let width = ref.current.clientWidth;
        if (width < 580) {
          setNumberOfMonths(1);
        } else {
          setNumberOfMonths(Math.floor(width / 320));
        }
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
    <div className="tp-calendar" ref={ref}>
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
            allowDisabledDaysSpan={allowDisabledDaysSpan}
            dayClasses={dayClasses}
          />
        )}
      </ThemeProvider>
    </div>
  );
};
