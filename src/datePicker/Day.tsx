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
import { DatePickerComponents } from "./datePicker.type";
import { classNames } from "../libs/classNames";
import { dayjs } from "../libs/dayjs-config";
import { getDayFormat } from "../libs/getDayFormat";
import { handleDayKeyDown } from "../libs/handleDayKeyDown";

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
  setSelectedDays: Dispatch<SetStateAction<string[]>>;
  setSource: Dispatch<SetStateAction<Dayjs>>;
  dayClasses?: (day: Dayjs) => string[];
  focusedDate: string;
  setFocusedDate: (date: string) => void;
  focusRef: MutableRefObject<string | null>;
  requestFocus: (date: string) => void;
};

const TODAY_GREG = () => dayjs().format(FORMAT_DATE);

export const Day = ({
  day,
  jalali,
  source,
  setSource,
  disabled,
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
  focusedDate,
  setFocusedDate,
  focusRef,
  requestFocus,
}: Props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const date = getDayFormat(day, jalali);
  const isFocused = focusedDate === date;
  const isSelected = selectedDays.includes(date);

  const effectiveBefore = (() => {
    if (!disabledBeforeToday) return disabledBeforeDate;
    const today = TODAY_GREG();
    return disabledBeforeDate && dayjs(disabledBeforeDate).isAfter(today)
      ? disabledBeforeDate
      : today;
  })();

  const isDisabled = (() => {
    if (disabled) return true;
    if (disabledDays.includes(date)) return true;
    if (effectiveBefore && dayjs(date).isBefore(effectiveBefore)) return true;
    if (disabledAfterDate && dayjs(date).isAfter(disabledAfterDate))
      return true;
    return false;
  })();

  useEffect(() => {
    if (
      isFocused &&
      ref.current &&
      focusRef.current === date &&
      document.activeElement !== ref.current
    ) {
      ref.current.focus({ preventScroll: true });
      focusRef.current = null;
    }
  }, [isFocused, date, focusRef]);

  const isInactiveMonth =
    day.month() !== source.add(numberOfMonth, "month").month();
  const isToday =
    dayjs()
      .calendar(jalali ? "jalali" : "gregory")
      .format(FORMAT_DATE) === day.format(FORMAT_DATE);

  const commit = (next: string[]) => {
    setSelectedDays(next);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (disabled) return;
    setFocusedDate(date);

    if (selectedDays.includes(date)) {
      commit(selectedDays.filter(d => d !== date));
      return;
    }

    // Clicking a disabled (but not selected) day must not fire onChange.
    if (isDisabled) return;

    if (numberOfSelectableDays === 1) {
      commit([date]);
      return;
    }

    if (
      numberOfSelectableDays > 0 &&
      selectedDays.length >= numberOfSelectableDays
    ) {
      return;
    }

    commit([...selectedDays, date]);
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
      handleClick(event as unknown as MouseEvent<HTMLButtonElement>);
    }
  };

  const DayComponent = components?.days;
  const extraDayClasses = dayClasses ? dayClasses(day).join(" ") : "";

  return (
    <Wrapper
      ref={ref}
      type="button"
      data-test={day.format(FORMAT_DATE)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isFocused ? 0 : -1}
      role="gridcell"
      aria-selected={isSelected}
      aria-disabled={isDisabled || undefined}
      aria-current={isToday ? "date" : undefined}
      aria-label={day.format("dddd, MMMM D, YYYY")}
      disabled={disabled}
      className={classNames(
        {
          inactive: isInactiveMonth,
          selected: isSelected,
          disabled: isDisabled,
          disable: disabled,
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
  font: inherit;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary.dark};
    outline-offset: 2px;
  }

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

  &.selected {
    color: #fff;
    background-color: ${({ theme }) => theme.primary.dark};
    box-shadow: 0px 10px 30px -12px ${({ theme }) => theme.primary.main};

    &:hover {
      background-color: ${({ theme }) => theme.primary.main};
      &.disable {
        color: #fff;
      }
    }

    p {
      color: #fff;
    }
  }
`;
