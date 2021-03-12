import { DisplayMonths } from "components/DisplayMonths";
import { Header } from "components";
import { ThemeProvider } from "styled-components";
import { dayjsLocalized } from "libs/dayjsLocalized";
import { theme } from "constant";
import { useEffect, useState } from "react";

import { DatePickerProps } from "./datePicker.type";
import { Months } from "./Months";

export const DatePicker: React.FC<DatePickerProps> = props => {
  const {
    jalali = false,
    startOfWeek = 0,
    numberOfMonths = 1,
    disabledDays = [],
    numberOfSelectableDays = 0,
    disabledBeforeToday = false,
    selectedDays: selectedDaysProps = [],
    onChange,
  } = props;

  const [selectedDays, setSelectedDays] = useState(selectedDaysProps);

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
          setSource={setSource}
          startOfWeek={startOfWeek}
          disabledDays={disabledDays}
          selectedDays={selectedDays}
          numberOfMonths={numberOfMonths}
          setSelectedDays={setSelectedDays}
          disabledBeforeToday={disabledBeforeToday}
          numberOfSelectableDays={numberOfSelectableDays}
        />
      )}
    </ThemeProvider>
  );
};
