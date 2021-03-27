import styled from "styled-components";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { FORMAT_DATE } from "constant";
import { classNames } from "libs/classNames";
import { dayjs } from "libs/dayjs-config";
import { dayjsLocalized } from "libs/dayjsLocalized";
import { getDayFormat } from "libs/getDayFormat";

import {
  RangePickerComponents,
  RangePickerOnChange,
  RangePickerSelectedDays,
} from "./rangePicker.type";

interface Props {
  day: Dayjs;
  source: Dayjs;
  jalali: boolean;
  hoverDay?: string;
  disabled: boolean;
  numberOfMonth: number;
  disabledDays: string[];
  disabledBeforeToday: boolean;
  disabledBeforeDate?: string;
  disabledAfterDate?: string;
  components?: RangePickerComponents;
  onChange: RangePickerOnChange;
  selectedDays?: RangePickerSelectedDays;
  setHoverDay: Dispatch<SetStateAction<string | undefined>>;
  setSelectedDays: Dispatch<
    SetStateAction<RangePickerSelectedDays | undefined>
  >;
}

export const Day = ({
  day,
  source,
  jalali,
  selectedDays,
  disabledDays,
  hoverDay,
  disabled,
  components,
  onChange,
  setHoverDay,
  setSelectedDays,
  numberOfMonth,
  disabledBeforeToday,
  disabledBeforeDate,
  disabledAfterDate,
}: Props) => {
  if (disabledBeforeToday) {
    const today = dayjs().format(FORMAT_DATE);
    disabledBeforeDate =
      disabledBeforeDate && dayjs(disabledBeforeDate).isAfter(today)
        ? disabledBeforeDate
        : today;
  }
  let dateFormat = getDayFormat(day, jalali);
  const handleDisabledDate = () => {
    return (
      disabledDays.includes(dateFormat) ||
      (disabledBeforeDate && dayjs(day).isBefore(disabledBeforeDate)) ||
      (disabledAfterDate && dayjs(day).isAfter(disabledAfterDate))
    );
  };

  const handleChangeState = (from: string, to: string) => {
    if (disabled) return;

    if (dayjs(from).isBefore(to)) {
      setSelectedDays({
        from,
        to,
      });
      onChange({
        from,
        to,
      });
    } else {
      setSelectedDays({
        from: to,
        to: from,
      });
      onChange({
        from: to,
        to: from,
      });
    }
  };
  const onClick = () => {
    if (disabled) return;
    // Handle disable dates
    if (disabledDays) {
      if (
        (disabledBeforeDate &&
          dayjs(dateFormat).isBefore(
            dayjsLocalized(jalali, disabledBeforeDate),
            "day",
          )) ||
        (disabledAfterDate &&
          dayjs(dateFormat).isAfter(
            dayjsLocalized(jalali, disabledAfterDate),
            "day",
          )) ||
        disabledDays.includes(dateFormat)
      ) {
        return false;
      }
    }

    // First click and set the from date
    if (!selectedDays?.from && !selectedDays?.to) {
      setSelectedDays({ from: dateFormat, to: "" });
    }
    // Second click and set the to date
    if (disabledDays && !selectedDays?.to && selectedDays?.from) {
      // Get list of disabled days between the from and the day
      let disables = disabledDays.filter(item => {
        if (dayjs(item).isBetween(selectedDays.from, dateFormat, null, "[]")) {
          return true;
        }
        return false;
      });
      // Check if we have a disabled days between them
      if (disables.length) {
        disables.sort((prev, next) => {
          return dayjs(disables[0]).isBefore(hoverDay!)
            ? dayjs(prev).isSameOrBefore(next)
              ? -1
              : 1
            : dayjs(prev).isSameOrBefore(next)
            ? 1
            : -1;
        });
        // We check here to ensure we set the day before the disabled day
        if (dayjs(disables[0]).isBefore(hoverDay!)) {
          handleChangeState(
            selectedDays?.from,
            getDayFormat(dayjs(disables[0]).subtract(1, "day"), jalali),
          );
        } else {
          handleChangeState(
            selectedDays?.from,
            getDayFormat(dayjs(disables[0]).add(1, "day"), jalali),
          );
        }
      } else {
        handleChangeState(selectedDays?.from, dateFormat);
      }
    } else if (!selectedDays?.to && selectedDays?.from) {
      handleChangeState(selectedDays?.from, dateFormat);
    }

    // Third click and set the from date and set the "to" date
    if (selectedDays?.from && selectedDays?.to) {
      setSelectedDays({ from: dateFormat, to: "" });
      setHoverDay(dateFormat);
    }
  };

  // Handle style between of days
  const handleRangeStyle = () => {
    if (!selectedDays?.from) {
      return false;
    }
    if (selectedDays?.from) {
      return dayjs(getDayFormat(day, jalali)).isBetween(
        selectedDays.from,
        selectedDays?.to ? selectedDays.to : hoverDay!,
        null,
        "[]",
      );
    }
    return false;
  };

  const hoverOnDay = () => {
    if (!selectedDays?.to && selectedDays?.from) {
      setHoverDay(dateFormat);
    }
  };

  const DayComponent = components?.days;
  return (
    <Wrapper
      data-test={day.format(FORMAT_DATE)}
      onClick={onClick}
      onMouseEnter={hoverOnDay}
      className={classNames({
        inactive: day.month() !== source.add(numberOfMonth, "month").month(),
        disabled: handleDisabledDate(),
        "range-select": handleRangeStyle(),
        jalali: jalali,
        disable: disabled,
        same: selectedDays && dayjs(selectedDays.from).isSame(selectedDays.to),
        "start-date":
          selectedDays &&
          dateFormat ===
            (dayjs(selectedDays.from).isSameOrBefore(
              selectedDays?.to ? selectedDays?.to : hoverDay!,
            )
              ? selectedDays.from
              : selectedDays.to),
        "end-date":
          selectedDays &&
          dateFormat ===
            (dayjs(selectedDays.from).isSameOrBefore(
              selectedDays?.to ? selectedDays?.to : hoverDay!,
            )
              ? selectedDays.to
              : selectedDays.from),

        today:
          dayjs()
            .calendar(jalali ? "jalali" : "gregory")
            .format(FORMAT_DATE) === day.format(FORMAT_DATE),
      })}
    >
      {DayComponent && (
        <DayComponent day={day.format(FORMAT_DATE)} jalali={jalali} />
      )}
      {!DayComponent && day.format("DD")}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 40px;
  height: 40px;
  transition: all 0.15s ease-in-out;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 5px;
  cursor: pointer;
  color: ${({ theme }) => theme.grey[900]};
  &:hover {
    background-color: ${({ theme }) => theme.primary.light};
    color: ${({ theme }) => theme.grey[700]};
    &.disable {
      background-color: transparent;
      color: ${({ theme }) => theme.grey[900]};
      cursor: default;
    }
  }

  &.inactive {
    color: transparent;
    visibility: hidden;
  }

  &.today {
    border: 1px solid #e2e2e2;
    border-radius: 50%;
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

  &.range-select {
    background-color: ${({ theme }) => theme.primary.dark};
    color: #fff;
    border: 0;
    border-radius: 0;

    &:hover {
      background-color: ${({ theme }) => theme.primary.dark};
      color: #fff;
    }
    box-shadow: 0px 10px 30px -12px ${({ theme }) => theme.primary.dark};

    &.jalali {
      box-shadow: 0px 10px 30px -12px ${({ theme }) => theme.primary.dark};
    }

    &.end-date {
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;

      &.jalali {
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
      }
    }

    &.start-date {
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;

      &.jalali {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
      }
    }
  }

  &.same {
    border-top-left-radius: 25px !important;
    border-bottom-left-radius: 25px !important;
    border-top-right-radius: 25px !important;
    border-bottom-right-radius: 25px !important;
  }
`;
