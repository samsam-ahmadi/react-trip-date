import { DisplayMonths } from "components/DisplayMonths";
import { Header } from "components";
import { ThemeProvider } from "styled-components";
import { dayjsLocalized } from "libs/dayjsLocalized";
import { theme } from "constant";
import { useEffect, useState } from "react";

import { Months } from "./Months";
import { RangePickerProps } from "./rangePicker.type";

export const RangePicker = ({
  jalali = false,
  startOfWeek = 0,
  numberOfMonths = 1,
  disabledDays = [],
  disabledBeforeToday = false,
  disabled = false,
  selectedDays: selectedDaysProps,
  onChange,
}: RangePickerProps) => {
  const [selectedDays, setSelectedDays] = useState(selectedDaysProps);
  const [hoverDay, setHoverDay] = useState<string>();
  const [displayMonths, setDisplayMonths] = useState(false);
  const [source, setSource] = useState(dayjsLocalized(jalali));

  useEffect(() => {
    setSource(dayjsLocalized(jalali));
  }, [jalali]);

  return (
    <ThemeProvider theme={theme}>
      <Header
        jalali={jalali}
        source={source}
        setSource={setSource}
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
          setHoverDay={setHoverDay}
          startOfWeek={startOfWeek}
          disabledDays={disabledDays}
          selectedDays={selectedDays}
          numberOfMonths={numberOfMonths}
          setSelectedDays={setSelectedDays}
          disabledBeforeToday={disabledBeforeToday}
        />
      )}
    </ThemeProvider>
  );
};
