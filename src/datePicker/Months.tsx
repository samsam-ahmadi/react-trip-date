import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useRef, useState } from "react";

import { Month, Weeks, Wrapper } from "./datePicker.style";
import { DatePickerComponents } from "./datePicker.type";
import { Day } from "./Day";
import { TitleOfWeek } from "../components/TitleOfWeek";
import { createCalendar } from "../libs/createCalendar";
import { sliceDaysOfMonthToWeeks } from "../libs/sliceDaysOfMonthToWeeks";

interface Props {
  source: Dayjs;
  jalali: boolean;
  disabled: boolean;
  startOfWeek: number;
  numberOfMonths: number;
  selectedDays: string[];
  disabledDays: string[];
  disabledBeforeToday: boolean;
  disabledBeforeDate?: string;
  disabledAfterDate?: string;
  numberOfSelectableDays: number;
  components?: DatePickerComponents;
  setSource: Dispatch<SetStateAction<Dayjs>>;
  setSelectedDays: Dispatch<SetStateAction<string[]>>;
  dayClasses?: (day: Dayjs) => string[];
}

const FMT = "YYYY-MM-DD";
const monthKey = (source: Dayjs) => source.format("YYYY-MM");
const weekKey = (firstDay: Dayjs) => firstDay.format(FMT);

export const Months = ({
  numberOfSelectableDays,
  numberOfMonths,
  startOfWeek,
  selectedDays,
  disabledDays,
  setSelectedDays,
  components,
  disabledBeforeToday,
  disabledBeforeDate,
  disabledAfterDate,
  jalali,
  disabled,
  source: sourceProp,
  setSource,
  dayClasses,
}: Props) => {
  const [focusedDate, setFocusedDate] = useState<string>(
    () => selectedDays[0] ?? sourceProp.format(FMT),
  );
  const focusRef = useRef<string | null>(null);
  const requestFocus = (date: string) => {
    focusRef.current = date;
  };

  const months = [];
  for (let i = 0; i < numberOfMonths; i++) {
    const monthSource = sourceProp.add(i, "month");
    const weeksDays: Dayjs[][] = sliceDaysOfMonthToWeeks(
      createCalendar({
        source: monthSource,
        startOfWeek: jalali ? 6 : startOfWeek,
      }),
      7,
    );
    months.push(
      <Month
        className="tp-calendar-month"
        $numberOfMonths={numberOfMonths || 1}
        key={monthKey(monthSource)}
        data-test={monthKey(monthSource)}
        role="grid"
        aria-label={monthSource.format("MMMM YYYY")}
      >
        <TitleOfWeek
          jalali={jalali}
          startOfWeek={startOfWeek}
          components={components?.titleOfWeek}
        />
        {weeksDays.map(week => (
          <Weeks
            className="tp-calendar-week"
            $jalali={jalali}
            data-test={weekKey(week[0])}
            key={weekKey(week[0])}
            role="row"
          >
            {week.map(day => (
              <Day
                day={day}
                jalali={jalali}
                numberOfMonth={i}
                disabled={disabled}
                source={sourceProp}
                setSource={setSource}
                components={components}
                disabledDays={disabledDays}
                key={day.format(FMT)}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                disabledBeforeToday={disabledBeforeToday}
                disabledBeforeDate={disabledBeforeDate}
                disabledAfterDate={disabledAfterDate}
                numberOfSelectableDays={numberOfSelectableDays}
                dayClasses={dayClasses}
                focusedDate={focusedDate}
                setFocusedDate={setFocusedDate}
                focusRef={focusRef}
                requestFocus={requestFocus}
              />
            ))}
          </Weeks>
        ))}
      </Month>,
    );
  }

  return (
    <Wrapper className="tp-calendar-months" $jalali={jalali}>
      {months}
    </Wrapper>
  );
};
