import styled from "styled-components";
import { Dayjs } from "dayjs";
import { Dispatch, FC, SetStateAction } from "react";
import { FORMAT_DATE } from "constant";
import { classNames } from "libs/classNames";
import { dayjs } from "libs/dayjs-config";
import { getDayFormat } from "libs/getDayFormat";

import { DatePickerComponents, DatePickerOnChange } from "./datePicker.type";

type Props = {
  day: Dayjs;
  source: Dayjs;
  jalali: boolean;
  disabled: boolean;
  numberOfMonth: number;
  selectedDays: string[];
  disabledDays: string[];
  numberOfSelectableDays: number;
  disabledBeforeToday: boolean;
  disabledBeforeDate?: string;
  disabledAfterDate?: string;
  components?: DatePickerComponents;
  onChange: DatePickerOnChange;
  setSelectedDays: Dispatch<SetStateAction<string[]>>;
  dayClasses?: (day: Dayjs) => string[];
};

export const Day: FC<Props> = ({
  day,
  jalali,
  source,
  disabled,
  onChange,
  components,
  selectedDays,
  disabledDays,
  numberOfMonth,
  setSelectedDays,
  disabledBeforeToday,
  numberOfSelectableDays,
  disabledBeforeDate,
  disabledAfterDate,
  dayClasses,
}) => {
  if (disabledBeforeToday) {
    const today = dayjs().format(FORMAT_DATE);
    disabledBeforeDate =
      disabledBeforeDate && dayjs(disabledBeforeDate).isAfter(today)
        ? disabledBeforeDate
        : today;
  }
  const handleSelectedDate = () => {
    const date = getDayFormat(day, jalali);
    return selectedDays.includes(date);
  };

  const handleDisabledDate = () => {
    let date = getDayFormat(day, jalali);
    return (
      disabledDays.includes(date) ||
      (disabledBeforeDate && dayjs(date).isBefore(disabledBeforeDate)) ||
      (disabledAfterDate && dayjs(date).isAfter(disabledAfterDate))
    );
  };

  const handleClick = () => {
    if (disabled) return;

    const date = getDayFormat(day, jalali);

    if (
      (disabledBeforeDate && dayjs(date).isBefore(disabledBeforeDate)) ||
      (disabledAfterDate && dayjs(date).isAfter(disabledAfterDate)) ||
      disabledDays.includes(date) ||
      selectedDays.includes(date)
    ) {
      let dates = selectedDays.filter(item => {
        return item !== date;
      });
      setSelectedDays(dates);
      onChange(dates);
      return;
    }

    if (numberOfSelectableDays) {
      if (numberOfSelectableDays === 1) {
        setSelectedDays([date]);
        onChange([date]);
        return;
      }
      if (
        selectedDays.length < numberOfSelectableDays &&
        numberOfSelectableDays > 0
      ) {
        if (selectedDays.includes(date)) {
          let dates = selectedDays.filter(item => {
            return item !== date;
          });
          setSelectedDays(dates);
          if (jalali) {
            onChange(dates);
          } else {
            onChange(dates);
          }
        } else {
          setSelectedDays([...selectedDays, date]);
          if (jalali) {
            onChange(selectedDays.concat([date]));
          } else {
            onChange([...selectedDays, date]);
          }
        }
      }
      return;
    }

    if (selectedDays.includes(date)) {
      let dates = selectedDays.filter(item => {
        return item !== date;
      });
      setSelectedDays(dates);
      if (jalali) {
        onChange(dates);
      } else {
        onChange(dates);
      }
    } else {
      setSelectedDays(selectedDays.concat([date]));
      if (jalali) {
        onChange(selectedDays.concat([date]));
      } else {
        onChange(selectedDays.concat([date]));
      }
    }
  };

  const DayComponent = components?.days;
  let extraDayClasses = "";
  if (dayClasses) {
    extraDayClasses = dayClasses(day).join(" ");
  }
  return (
    <Wrapper
      data-test={day.format(FORMAT_DATE)}
      onClick={handleClick}
      className={classNames(
        {
          inactive: day.month() !== source.add(numberOfMonth, "month").month(),
          selected: handleSelectedDate(),
          disabled: handleDisabledDate(),
          disable: disabled,
          today:
            dayjs()
              .calendar(jalali ? "jalali" : "gregory")
              .format(FORMAT_DATE) === day.format(FORMAT_DATE),
        },
        extraDayClasses,
        "tp-calendar-day",
      )}
    >
      {DayComponent && (
        <DayComponent day={day.format(FORMAT_DATE)} jalali={jalali} />
      )}
      {!DayComponent && day.format("DD")}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 50%;
  margin-left: 5px;
  margin-bottom: 5px;
  width: 38px;
  height: 38px;
  transition: all 0.15s ease-in-out;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  color: ${({ theme }) => theme.grey[900]};
  user-select: none;

  &:hover {
    background-color: ${({ theme }) => theme.primary.light};
    color: ${({ theme }) => theme.grey[700]};
    &.disable {
      cursor: default;
      background-color: transparent;
      color: ${({ theme }) => theme.grey[900]};
    }
  }

  &.inactive {
    color: transparent;
    visibility: hidden;
  }

  &.today {
    border: 1px solid #e2e2e2;
  }

  &.disabled {
    color: ${({ theme }) => theme.text.disabled};
    position: relative;

    &:hover {
      background-color: transparent;
      color: ${({ theme }) => theme.text.disabled};
      cursor: not-allowed;
    }

    &::after {
      position: absolute;
      content: "";
      width: 15px;
      height: 2px;
      background-color: ${({ theme }) => theme.text.disabled};
      transform: rotate(-20deg);
    }
  }
  &.selected {
    color: #fff;
    background-color: ${props => props.theme.primary.dark};
    box-shadow: 0px 10px 30px -12px ${props => props.theme.primary.main};

    &:hover {
      background-color: ${props => props.theme.primary.main};
      &.disable {
        color: #fff;
      }
    }

    p {
      color: #fff;
    }
  }
`;
