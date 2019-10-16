import * as React from 'react';
import dayjs from './libs/dayjs';
import { dayjsLocalized } from './libs/dayjs';

import { DatePickerProps } from './typing';

import { Header } from './component/Header';
import { Month } from './date-picker/Month';
import DisplayMonth from './component/DisplayMonth';
import { convertDatesToArray } from './libs';
import Context from './context/Context';

const DatePicker: React.FunctionComponent<DatePickerProps> = ({
  jalali = false,
  numberOfMonths = 1,
  handleChange,
  selectedDays = [],
  numberOfSelectableDays = 0,
  disabledDays = [],
  responsive = undefined,
  disabled = false,
  disabledBeforToday = true,
  dayComponent,
  titleComponent,
}) => {
  const [cloneselectedDays, setSelectedDays] = React.useState(selectedDays);
  const [numberOfMonth, setNumberOfMonth] = React.useState(numberOfMonths);
  const [displayMonths, setDisplayMonths] = React.useState(false);

  const [source, setSource] = React.useState(dayjsLocalized(jalali));

  React.useEffect(() => {
    if (selectedDays.length > 0) {
      let firstDate = selectedDays.sort((prev, next) => {
        return dayjs(prev).isSameOrBefore(next) ? -1 : 1;
      })[0];

      let diffDay = 0;
      diffDay = (dayjs(firstDate) as any).diff(
        (dayjs() as any).format('YYYY-MM-DD'),
        'day',
      );
      setSource(
        (dayjs() as any)
          .add(diffDay, 'day')
          .calendar(jalali ? 'jalali' : 'gregory')
          .locale(jalali ? 'fa' : 'en'),
      );
    } else {
      setSource(dayjsLocalized(jalali));
    }
  }, [jalali]);

  React.useEffect(() => {
    if (selectedDays) {
      if (jalali) {
        setSelectedDays(convertDatesToArray(selectedDays, jalali));
      } else {
        setSelectedDays(selectedDays);
      }
    }
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      responsive(setNumberOfMonth);
    };
    if (responsive) {
      responsive(setNumberOfMonth);
      if (typeof window !== 'undefined') {
        //handle ssr
        window.addEventListener('resize', handleResize);
      }
    } else {
      setNumberOfMonth(numberOfMonths);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [numberOfMonths]);

  return (
    <div className="tp-calendar">
      <Context.Provider
        value={{
          handleChange,
          selectedDays: cloneselectedDays,
          disabledDays,
          displayMonths,
          setDisplayMonths,
          numberOfSelectableDays,
          disabled,
          disabledBeforToday,
          setSelectedDays,
          numberOfMonths: numberOfMonth,
          jalali,
          source,
          setSource,
          DayComponent: dayComponent,
          TitleComponent: titleComponent,
        }}
      >
        <Header />
        {displayMonths ? <DisplayMonth /> : <Month />}
      </Context.Provider>
    </div>
  );
};

export default DatePicker;
