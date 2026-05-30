import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useRef, useState } from "react";

import { Day } from "./Day";
import {
  RangePickerComponents,
  RangePickerSelectedDays,
} from "./rangePicker.type";
import { TitleOfWeek } from "../components/TitleOfWeek";
import { Month, Weeks, Wrapper } from "../datePicker/datePicker.style";
import { createCalendar } from "../libs/createCalendar";
import { sliceDaysOfMonthToWeeks } from "../libs/sliceDaysOfMonthToWeeks";

interface Props {
  source: Dayjs;
  jalali: boolean;
  startOfWeek: number;
  hoverDay?: string;
  numberOfMonths: number;
  selectedDays?: RangePickerSelectedDays;
  disabledDays: string[];
  disabledBeforeToday: boolean;
  disabledBeforeDate?: string;
  disabledAfterDate?: string;
  disabled: boolean;
  allowDisabledDaysSpan: boolean;
  components?: RangePickerComponents;
  setSource: Dispatch<SetStateAction<Dayjs>>;
  setHoverDay: Dispatch<SetStateAction<string | undefined>>;
  setSelectedDays: Dispatch<SetStateAction<RangePickerSelectedDays>>;
  dayClasses?: (day: Dayjs) => string[];
}

const FMT = "YYYY-MM-DD";
const monthKey = (source: Dayjs) => source.format("YYYY-MM");
const weekKey = (firstDay: Dayjs) => firstDay.format(FMT);

export const Months = ({
  allowDisabledDaysSpan,
  numberOfMonths,
  startOfWeek,
  selectedDays,
  disabledDays,
  hoverDay,
  setHoverDay,
  components,
  setSelectedDays,
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
    () => selectedDays?.from ?? sourceProp.format(FMT),
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
                hoverDay={hoverDay}
                setHoverDay={setHoverDay}
                components={components}
                source={sourceProp}
                setSource={setSource}
                disabled={disabled}
                disabledDays={disabledDays}
                key={day.format(FMT)}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                disabledBeforeToday={disabledBeforeToday}
                allowDisabledDaysSpan={allowDisabledDaysSpan}
                disabledBeforeDate={disabledBeforeDate}
                disabledAfterDate={disabledAfterDate}
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
