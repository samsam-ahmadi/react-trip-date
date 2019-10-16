import * as React from 'react';

import { DayStyle } from '../index.styles';
import classNames from 'classnames';
import dayjs from '../libs/dayjs';

import { DatePickerDayProps } from '../typing';

import { convertDatesToArray } from '../libs/index';
import Context from '../context/Context';

export const Day: React.FunctionComponent<DatePickerDayProps> = ({
  day,
  month,
}) => {
  const {
    source,
    handleChange,
    selectedDays,
    disabledBeforToday,
    setSelectedDays,
    jalali,
    disabled,
    disabledDays,
    numberOfSelectableDays,
    DayComponent,
  } = React.useContext(Context);

  const handleClick = day => {
    let date = day.currentTarget.getAttribute('data-date');
    if (disabled) return false;

    if (
      (disabledBeforToday &&
        dayjs(date).isBefore(
          (dayjs() as any)
            .calendar(jalali ? 'jalali' : 'gregory')
            .format('YYYY-MM-DD'),
        )) ||
      disabledDays.includes(
        (dayjs(date, { jalali: jalali } as any) as any)
          .calendar(jalali ? 'gregory' : '')
          .format('YYYY-MM-DD'),
      )
    ) {
      let dates = selectedDays.filter(item => {
        return item !== date;
      });
      setSelectedDays(dates);
      handleChange(dates);
      return false;
    }

    if (numberOfSelectableDays) {
      if (numberOfSelectableDays === 1) {
        setSelectedDays([date]);
        return false;
      }
      if (
        selectedDays.length < numberOfSelectableDays &&
        numberOfSelectableDays > 0
      ) {
        // user could selected just size of multipleDate
        if (selectedDays.includes(date)) {
          let dates = selectedDays.filter(item => {
            return item !== date;
          });
          setSelectedDays(dates);
          if (jalali) {
            handleChange(convertDatesToArray(dates, !jalali));
          } else {
            handleChange(dates);
          }
        } else {
          setSelectedDays([...selectedDays, date]);
          if (jalali) {
            handleChange(
              convertDatesToArray(selectedDays.concat([date]), !jalali),
            );
          } else {
            handleChange([...selectedDays, date]);
          }
        }
      } else {
        // otherwise user must remove extra date selected
        // (if selectedDate default more than multipleDate)
        if (selectedDays.includes(date)) {
          let dates = selectedDays.filter(item => {
            return item !== date;
          });
          setSelectedDays(dates);
          if (jalali) {
            handleChange(convertDatesToArray(dates, !jalali));
          } else {
            handleChange(dates);
          }
        }
      }
    } else {
      // if doesn't multipleDate user could choose a lot and remove
      if (selectedDays.includes(date)) {
        let dates = selectedDays.filter(item => {
          return item !== date;
        });

        setSelectedDays([...dates]);
        if (jalali) {
          handleChange(convertDatesToArray(dates, !jalali));
        } else {
          handleChange(dates);
        }
      } else {
        setSelectedDays(selectedDays.concat([date]));
        if (jalali) {
          handleChange(
            convertDatesToArray(selectedDays.concat([date]), !jalali),
          );
        } else {
          handleChange(selectedDays.concat([date]));
        }
      }
    }
    return false;
  };

  const handleSelectedDate = day => {
    let date = (dayjs(day, { jalali: jalali } as any, 'YYYY-MM-DD') as any)
      .calendar(jalali ? 'jalali' : 'gregory')
      .format('YYYY-MM-DD');
    return selectedDays.includes(date);
  };

  const handleDisabledDate = day => {
    let date = (dayjs(day) as any).format('YYYY-MM-DD');

    if (jalali) {
      date = (dayjs(day, { jalali: jalali } as any, 'YYYY-MM-DD') as any)
        .calendar('gregory')
        .format('YYYY-MM-DD');
    }
    return (
      disabledDays.includes(date) ||
      (disabledBeforToday && dayjs(date).isBefore(dayjs().format('YYYY-MM-DD')))
    );
  };
  return (
    <DayStyle
      className={classNames({
        'select-mode': true,
        inactive: day.month() !== source.subtract(-month, 'month').month(),
        selected: handleSelectedDate(day),
        disabled: handleDisabledDate(day),
        today:
          (dayjs() as any)
            .calendar(jalali ? 'jalali' : 'gregory')
            .format('YYYY-MM-DD') === day.format('YYYY-MM-DD'),
      })}
      data-date={day.format('YYYY-MM-DD')}
      onClick={day => handleClick(day)}
    >
      {DayComponent ? (
        <DayComponent day={day} />
      ) : (
        <p className="date">{day.format('DD')}</p>
      )}
    </DayStyle>
  );
};
