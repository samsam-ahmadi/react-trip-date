import * as React from 'react';
import dayjs, { dayjsLocalized } from './libs/dayjs';
import { CalendarProps } from './typing';
import DisplayMonth from './component/DisplayMonth';
import { Header } from './component/Header';
import { Month } from './range-picker/Month';
import Context from './context/Context';
const defaultSelectedDays = {
  from: '',
  to: '',
};
const RangePicker: React.FunctionComponent<CalendarProps> = ({
  jalali = false,
  numberOfMonths = 1,
  handleChange,
  selectedDays = defaultSelectedDays,
  disabled = false,
  disabledDays = [],
  responsive,
  hoverable = true,
  dayComponent,
  disabledBeforToday = true,
  titleComponent,
}) => {
  const [stateOfRange, setStateOfRange] = React.useState(false);
  const [hoverDay, setHoverDay] = React.useState(null);
  const [firstClick, setFirstClick] = React.useState(true);
  const [numberOfMonth, setNumberOfMonth] = React.useState(numberOfMonths);
  const [displayMonths, setDisplayMonths] = React.useState(false);

  const [cloneSelectedDays, setSelectedDays] = React.useState({
    from: '',
    to: '',
  });
  const [source, setSource] = React.useState(dayjsLocalized(jalali));

  React.useEffect(() => {
    if (selectedDays.from) {
      let diffDay = 0;
      diffDay = dayjs(selectedDays.from).diff(
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
    return () => {};
  }, [jalali]);

  React.useEffect(() => {
    if (selectedDays.from.length > 0) {
      if (jalali) {
        setSelectedDays({
          from: (dayjs(selectedDays.from) as any)
            .calendar('jalali')
            .format('YYYY-MM-DD'),
          to: (dayjs(selectedDays.to) as any)
            .calendar('jalali')
            .format('YYYY-MM-DD'),
        });
      } else {
        setSelectedDays({
          from: selectedDays.from,
          to: selectedDays.to,
        });
      }
    }
    return () => {};
  }, [jalali]);

  React.useEffect(() => {
    const handleResize = () => {
      responsive(setNumberOfMonth);
    };
    if (responsive) {
      responsive(setNumberOfMonth);
      if (typeof window !== 'undefined') {
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
          DayComponent: dayComponent,
          TitleComponent: titleComponent,
          handleChange,
          selectedDays: cloneSelectedDays,
          disabledDays,
          disabled,
          setSelectedDays,
          displayMonths,
          setDisplayMonths,
          numberOfMonths: numberOfMonth,
          jalali,
          source,
          setSource,
          stateOfRange,
          setStateOfRange,
          hoverDay,
          setHoverDay,
          firstClick,
          setFirstClick,
          hoverable,
          disabledBeforToday,
        }}
      >
        <Header />
        {displayMonths ? <DisplayMonth /> : <Month />}
      </Context.Provider>
    </div>
  );
};

export default RangePicker;
