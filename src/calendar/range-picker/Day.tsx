import * as React from 'react';

import { DayStyle } from '../index.styles';
import classNames from 'classnames';
import dayjs, { dayjsLocalized } from '../libs/dayjs';
import { DayProps } from '../typing';
import Context from '../context/Context';

export const Day: React.FunctionComponent<DayProps> = ({ day, month }) => {
  let {
    handleChange,
    selectedDays,
    disabledDays,
    disabled,
    setSelectedDays,
    jalali,
    source,
    stateOfRange,
    setStateOfRange,
    hoverDay,
    setHoverDay,
    firstClick,
    setFirstClick,
    hoverable,
    disabledBeforToday,
    DayComponent,
  } = React.useContext(Context);
  const handleClick = async day => {
    let date = day;

    if (disabledDays) {
      if (
        (disabledBeforToday &&
          dayjs(date, { jalali: jalali } as any, 'YYYY-MM-DD').isBefore(
            dayjsLocalized(jalali),
            'day',
          )) ||
        disabledDays.includes(
          (dayjs(date, { jalali: jalali } as any) as any)
            .calendar(jalali ? 'gregory' : '')
            .format('YYYY-MM-DD'),
        )
      ) {
        return false;
      }
    }

    if (disabled) return false;

    if (!stateOfRange) {
      setSelectedDays({ from: '', ...selectedDays });
    }

    if (firstClick) {
      setSelectedDays({ ...selectedDays, from: date });
      setHoverDay(date);
      setFirstClick(false);
      setStateOfRange(true);
    } else {
      if (disabledDays) {
        let disables = disabledDays.filter(item => {
          if (jalali) {
            item = (dayjs(item) as any).calendar('jalali').format('YYYY-MM-DD');
          }
          if (dayjs(item).isBetween(selectedDays.from, date, null, '[]')) {
            return true;
          }
          return false;
        });

        if (disables.length > 0) {
          if (dayjs(selectedDays.from).isSameOrBefore(hoverDay)) {
            disables.sort((prev, next) => {
              return dayjs(prev).isSameOrBefore(next) ? -1 : 1;
            });

            if (jalali) {
              setHoverDay(
                (dayjs(disables[0]) as any)
                  .subtract(1, 'day')
                  .calendar('jalali')
                  .format('YYYY-MM-DD'),
              );

              setSelectedDays({
                from: selectedDays.from,
                to: (dayjs(disables[0]) as any)
                  .subtract(1, 'day')
                  .calendar('jalali')
                  .format('YYYY-MM-DD'),
              });

              handleChange({
                to: (dayjs(disables[0]) as any)
                  .subtract(1, 'day')
                  .format('YYYY-MM-DD'),
                from: (dayjs(selectedDays.from, {
                  jalali: jalali,
                } as any) as any)
                  .calendar('gregory')
                  .format('YYYY-MM-DD'),
              });
            } else {
              setHoverDay(
                (dayjs(disables[0]) as any)
                  .subtract(1, 'day')
                  .format('YYYY-MM-DD'),
              );

              setSelectedDays({
                from: selectedDays.from,
                to: (dayjs(disables[0]) as any)
                  .subtract(1, 'day')
                  .format('YYYY-MM-DD'),
              });

              handleChange({
                to: (dayjs(disables[0]) as any)
                  .subtract(1, 'day')
                  .format('YYYY-MM-DD'),
                from: selectedDays.from,
              });
            }
          } else {
            disables.sort((prev, next) => {
              return dayjs(prev).isSameOrBefore(next) ? 1 : -1;
            });
            if (jalali) {
              setHoverDay(
                (dayjs(disables[0]) as any)
                  .add(1, 'day')
                  .calendar('jalali')
                  .format('YYYY-MM-DD'),
              );

              setSelectedDays({
                to: selectedDays.from,
                from: (dayjs(disables[0]) as any)
                  .add(1, 'day')
                  .calendar('jalali')
                  .format('YYYY-MM-DD'),
              });

              handleChange({
                from: (dayjs(disables[0]) as any)
                  .add(1, 'day')
                  .format('YYYY-MM-DD'),
                to: (dayjs(selectedDays.from, {
                  jalali: jalali,
                } as any) as any)
                  .calendar('gregory')
                  .format('YYYY-MM-DD'),
              });
            } else {
              setHoverDay(
                (dayjs(disables[0]) as any).add(1, 'day').format('YYYY-MM-DD'),
              );

              setSelectedDays({
                to: selectedDays.from,
                from: (dayjs(disables[0]) as any)
                  .add(1, 'day')
                  .format('YYYY-MM-DD'),
              });

              handleChange({
                from: (dayjs(disables[0]) as any)
                  .add(1, 'day')
                  .format('YYYY-MM-DD'),
                to: selectedDays.from,
              });
            }
          }
        } else {
          setHoverDay(date);
          if (dayjs(selectedDays.from).isSameOrBefore(hoverDay)) {
            setSelectedDays({
              from: selectedDays.from,
              to: date,
            });
          } else {
            setSelectedDays({
              to: selectedDays.from,
              from: date,
            });
          }
          returnHandleChange(jalali, date);
        }
      } else {
        // if disableDate not exist
        setSelectedDays({
          from: selectedDays.from,
          to: hoverDay,
        });
        setHoverDay(date);
        returnHandleChange(jalali, date);
      }
      setFirstClick(true);
      setStateOfRange(false);
    }
    return false;
  };

  const returnHandleChange = async (jalali, date) => {
    if (await dayjs(selectedDays.from).isSameOrBefore(date)) {
      if (jalali) {
        handleChange({
          from: (dayjs(selectedDays.from, {
            jalali: jalali,
          } as any) as any)
            .calendar('gregory')
            .format('YYYY-MM-DD'),
          to: (dayjs(date, { jalali: jalali } as any) as any)
            .calendar('gregory')
            .format('YYYY-MM-DD'),
        });
      } else {
        handleChange({
          from: selectedDays.from,
          to: date,
        });
      }
    } else {
      if (jalali) {
        handleChange({
          to: (dayjs(selectedDays.from, {
            jalali: jalali,
          } as any) as any)
            .calendar('gregory')
            .format('YYYY-MM-DD'),
          from: (dayjs(date, { jalali: jalali } as any) as any)
            .calendar('gregory')
            .format('YYYY-MM-DD'),
        });
      } else {
        handleChange({
          to: selectedDays.from,
          from: date,
        });
      }
    }
  };
  const hoverDays = async day => {
    let date = day.currentTarget.getAttribute('data-date');

    if (!disabled) {
      if (stateOfRange) {
        setHoverDay(date);
        setSelectedDays({ ...selectedDays, to: date });
      }
    }
  };

  const handleHoverDays = day => {
    // check if user want select range
    if (selectedDays.from.length === 0) {
      return false;
    }
    if (stateOfRange) {
      if (
        day.isBefore(
          (dayjs(hoverDay, { jalali: jalali } as any) as any).calendar(
            'gregory',
          ),
        )
      ) {
        return day.isBetween(
          (dayjs(selectedDays.from, {
            jalali: jalali,
          } as any) as any).calendar('gregory'),
          (dayjs(hoverDay, { jalali: jalali } as any) as any).calendar(
            'gregory',
          ),
          null,
          '[]',
        );
      } else {
        return day.isBetween(
          (dayjs(hoverDay, { jalali: jalali } as any) as any).calendar(
            'gregory',
          ),
          (dayjs(selectedDays.from, {
            jalali: jalali,
          } as any) as any).calendar('gregory'),
          null,
          '[]',
        );
      }
    } else {
      return day.isBetween(
        (dayjs(selectedDays.from, {
          jalali: jalali,
        } as any) as any).calendar('gregory'),
        (dayjs(selectedDays.to, {
          jalali: jalali,
        } as any) as any).calendar('gregory'),
        null,
        '[]',
      );
    }
  }; // end handleHoverDays

  const handleDisabledDate = day => {
    let date = (dayjs(day) as any).format('YYYY-MM-DD');
    if (jalali) {
      date = (dayjs(day, { jalali: jalali } as any, 'YYYY-MM-DD') as any)
        .calendar('gregory')
        .format('YYYY-MM-DD');
    }
    if (!disabledBeforToday) return false;
    return (
      disabledDays.includes(date) || dayjs(dayjs(date)).isBefore(dayjs(), 'day')
    );
  };
  return (
    <DayStyle
      className={classNames({
        inactive: day.month() !== source.subtract(-month, 'month').month(),
        'range-select': handleHoverDays(day),
        disabled: handleDisabledDate(day),
        'start-date':
          dayjs(day).format('YYYY-MM-DD') ===
          (dayjs(selectedDays.from).isSameOrBefore(selectedDays.to)
            ? selectedDays.from
            : selectedDays.to),
        'end-date':
          dayjs(day).format('YYYY-MM-DD') ===
          (dayjs(selectedDays.from).isSameOrBefore(selectedDays.to)
            ? selectedDays.to
            : selectedDays.from),
        jalali: jalali,
        today:
          (dayjs() as any)
            .calendar(jalali ? 'jalali' : 'gregory')
            .format('YYYY-MM-DD') === day.format('YYYY-MM-DD'),
        same: dayjs(selectedDays.from).isSame(selectedDays.to),
      })}
      data-date={day.format('YYYY-MM-DD')}
      onClick={day => handleClick(day.currentTarget.getAttribute('data-date'))}
      onMouseEnter={e => (hoverable ? hoverDays(e) : null)}
    >
      {DayComponent ? (
        <DayComponent day={day} />
      ) : (
        <p className="date">{day.format('DD')}</p>
      )}
    </DayStyle>
  );
};
