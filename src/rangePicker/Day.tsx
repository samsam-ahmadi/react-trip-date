import { Dayjs } from "dayjs";
import {
  Dispatch,
  KeyboardEvent,
  MouseEvent,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import styled from "styled-components";

import { FORMAT_DATE } from "../constant";
import {
  RangePickerComponents,
  RangePickerSelectedDays,
} from "./rangePicker.type";
import { classNames } from "../libs/classNames";
import { dayjs } from "../libs/dayjs-config";
import { getDayFormat } from "../libs/getDayFormat";
import { handleDayKeyDown } from "../libs/handleDayKeyDown";
import { isMobile } from "../libs/isMobile";

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
  allowDisabledDaysSpan: boolean;
  components?: RangePickerComponents;
  selectedDays?: RangePickerSelectedDays;
  setHoverDay: Dispatch<SetStateAction<string | undefined>>;
  setSelectedDays: Dispatch<SetStateAction<RangePickerSelectedDays>>;
  setSource: Dispatch<SetStateAction<Dayjs>>;
  dayClasses?: (day: Dayjs) => string[];
  focusedDate: string;
  setFocusedDate: (date: string) => void;
  focusRef: MutableRefObject<string | null>;
  requestFocus: (date: string) => void;
}

const TODAY_GREG = () => dayjs().format(FORMAT_DATE);

export const Day = ({
  day,
  source,
  setSource,
  jalali,
  selectedDays,
  disabledDays,
  allowDisabledDaysSpan,
  hoverDay,
  disabled,
  components,
  setHoverDay,
  setSelectedDays,
  numberOfMonth,
  disabledBeforeToday,
  disabledBeforeDate,
  disabledAfterDate,
  dayClasses,
  focusedDate,
  setFocusedDate,
  focusRef,
  requestFocus,
}: Props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const dateFormat = getDayFormat(day, jalali);
  const isFocused = focusedDate === dateFormat;

  const effectiveBefore = (() => {
    if (!disabledBeforeToday) return disabledBeforeDate;
    const today = TODAY_GREG();
    return disabledBeforeDate && dayjs(disabledBeforeDate).isAfter(today)
      ? disabledBeforeDate
      : today;
  })();

  const isDisabledDate = (target: string): boolean => {
    if (disabledDays.includes(target)) return true;
    if (effectiveBefore && dayjs(target).isBefore(effectiveBefore)) return true;
    if (disabledAfterDate && dayjs(target).isAfter(disabledAfterDate))
      return true;
    return false;
  };

  useEffect(() => {
    if (
      isFocused &&
      ref.current &&
      focusRef.current === dateFormat &&
      document.activeElement !== ref.current
    ) {
      ref.current.focus({ preventScroll: true });
      focusRef.current = null;
    }
  }, [isFocused, dateFormat, focusRef]);

  const commit = (next: RangePickerSelectedDays) => {
    setSelectedDays(next);
  };

  const handleChangeState = (from: string, to: string) => {
    if (disabled) return;
    if (dayjs(from).isBefore(to)) {
      commit({ from, to });
    } else {
      commit({ from: to, to: from });
    }
  };

  const handleSelect = () => {
    if (disabled || isDisabledDate(dateFormat)) return;

    // First click — set the "from" date.
    if (!selectedDays?.from && !selectedDays?.to) {
      setHoverDay("");
      commit({ from: dateFormat, to: "" });
      return;
    }

    // Second click — set the "to" date.
    if (selectedDays?.from && !selectedDays?.to) {
      const disables = disabledDays.filter(item =>
        dayjs(item).isBetween(selectedDays.from, dateFormat, null, "[]"),
      );
      if (disables.length && !allowDisabledDaysSpan) {
        const probe = hoverDay ?? dateFormat;
        const sorted = [...disables].sort((prev, next) =>
          dayjs(disables[0]).isBefore(probe)
            ? dayjs(prev).isSameOrBefore(next)
              ? -1
              : 1
            : dayjs(prev).isSameOrBefore(next)
              ? 1
              : -1,
        );
        const clamp = sorted[0];
        if (dayjs(clamp).isBefore(probe)) {
          handleChangeState(
            selectedDays.from,
            getDayFormat(dayjs(clamp).subtract(1, "day"), jalali),
          );
        } else {
          handleChangeState(
            selectedDays.from,
            getDayFormat(dayjs(clamp).add(1, "day"), jalali),
          );
        }
      } else {
        handleChangeState(selectedDays.from, dateFormat);
      }
      return;
    }

    // Third click — reset.
    setHoverDay("");
    commit({ from: dateFormat, to: "" });
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (disabled) return;
    setFocusedDate(dateFormat);
    handleSelect();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (
      handleDayKeyDown(event, {
        day,
        source,
        setSource,
        setFocusedDate,
        requestFocus,
      })
    ) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect();
    }
  };

  const hoverOnDay = () => {
    if (!selectedDays?.to && selectedDays?.from) {
      setHoverDay(dateFormat);
    }
  };

  const getEndDateForClasses = () => {
    if (!selectedDays) return "";
    if (selectedDays.to) return selectedDays.to;
    if (hoverDay) return hoverDay;
    return selectedDays.from;
  };

  const isRangeSelected = (): boolean => {
    if (!selectedDays || !selectedDays.from) return false;
    if (dateFormat === selectedDays.from) return true;
    const endDate = getEndDateForClasses();
    if (isDisabledDate(endDate)) return false;
    return dayjs(dateFormat).isBetween(selectedDays.from, endDate, null, "[]");
  };

  const isInactiveMonth =
    day.month() !== source.add(numberOfMonth, "month").month();
  const isToday =
    dayjs()
      .calendar(jalali ? "jalali" : "gregory")
      .format(FORMAT_DATE) === day.format(FORMAT_DATE);

  const disabledClass = isDisabledDate(dateFormat) && !isRangeSelected();
  const startDateClass =
    !!selectedDays &&
    dateFormat ===
      (dayjs(selectedDays.from).isSameOrBefore(getEndDateForClasses())
        ? selectedDays.from
        : selectedDays.to);
  const endDateClass =
    !!selectedDays &&
    dateFormat ===
      (dayjs(selectedDays.from).isSameOrBefore(getEndDateForClasses())
        ? selectedDays.to
        : selectedDays.from);

  const DayComponent = components?.days;
  const extraDayClasses = dayClasses ? dayClasses(day).join(" ") : "";

  return (
    <Wrapper
      ref={ref}
      type="button"
      data-test={day.format(FORMAT_DATE)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={isMobile() ? undefined : hoverOnDay}
      tabIndex={isFocused ? 0 : -1}
      role="gridcell"
      aria-selected={startDateClass || endDateClass || isRangeSelected()}
      aria-disabled={disabledClass || disabled || undefined}
      aria-current={isToday ? "date" : undefined}
      aria-label={day.format("dddd, MMMM D, YYYY")}
      disabled={disabled}
      className={classNames(
        {
          inactive: isInactiveMonth,
          disabled: disabledClass,
          "range-select": isRangeSelected(),
          jalali,
          disable: disabled,
          same:
            !!selectedDays && dayjs(selectedDays.from).isSame(selectedDays.to),
          "start-date": startDateClass,
          "end-date": endDateClass,
          today: isToday,
        },
        extraDayClasses,
        "tp-calendar-day",
      )}
    >
      {DayComponent ? (
        <DayComponent day={day.format(FORMAT_DATE)} jalali={jalali} />
      ) : (
        day.format("DD")
      )}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  border: 0;
  background: transparent;
  font: inherit;
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

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary.dark};
    outline-offset: 2px;
  }

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
    cursor: not-allowed;

    &:hover {
      background-color: transparent;
      color: ${({ theme }) => theme.text.disabled};
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
