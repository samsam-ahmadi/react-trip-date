import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { TitleOfWeek } from "components/TitleOfWeek";
import { createCalendar } from "libs/createCalendar";
import { sliceDaysOfMonthToWeeks } from "libs/sliceDaysOfMonthToWeeks";

import { DatePickerComponents, DatePickerOnChange } from "./datePicker.type";
import { Day } from "./Day";
import { Month, Weeks, Wrapper } from "./datePicker.style";

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
  onChange: DatePickerOnChange;
  components?: DatePickerComponents;
  setSource: Dispatch<SetStateAction<Dayjs>>;
  setSelectedDays: Dispatch<SetStateAction<string[]>>;
}

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
  onChange,
  source: sourceProp,
}: Props) => {
  const renderMonths = () => {
    let months = [];
    for (let i = 0; i < numberOfMonths; i++) {
      let source = sourceProp.add(i, "month");
      const weeksDays: Dayjs[][] = sliceDaysOfMonthToWeeks(
        createCalendar({
          source: source,
          startOfWeek: jalali ? 6 : startOfWeek || 0,
        }),
        7,
      );
      months.push(
        <Month
          numberOfMonths={numberOfMonths || 1}
          key={dayjs().set("month", 1).set("day", 1).diff(source, "d")}
          data-test={dayjs().set("month", 1).set("day", 1).diff(source, "d")}
        >
          <TitleOfWeek jalali={jalali} components={components?.titleOfWeek} />
          {weeksDays.map(week => (
            <Weeks
              jalali={jalali}
              data-test={dayjs()
                .set("month", 1)
                .set("day", 1)
                .diff(week[0], "d")}
              key={dayjs().set("month", 1).set("day", 1).diff(week[0], "d")}
            >
              {week.map(day => (
                <Day
                  day={day}
                  jalali={jalali}
                  numberOfMonth={i}
                  disabled={disabled}
                  onChange={onChange}
                  source={sourceProp}
                  components={components}
                  disabledDays={disabledDays}
                  key={day.format("YYYY-MM-DD")}
                  selectedDays={selectedDays}
                  setSelectedDays={setSelectedDays}
                  disabledBeforeToday={disabledBeforeToday}
                  disabledBeforeDate={disabledBeforeDate}
                  disabledAfterDate={disabledAfterDate}
                  numberOfSelectableDays={numberOfSelectableDays}
                />
              ))}
            </Weeks>
          ))}
        </Month>,
      );
    }
    return months;
  };
  return <Wrapper jalali={jalali}>{renderMonths()}</Wrapper>;
};
