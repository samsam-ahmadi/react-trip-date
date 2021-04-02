import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { Month, Weeks, Wrapper } from "datePicker/datePicker.style";
import { TitleOfWeek } from "components/TitleOfWeek";
import { createCalendar } from "libs/createCalendar";
import { dayjs } from "libs/dayjs-config";
import { sliceDaysOfMonthToWeeks } from "libs/sliceDaysOfMonthToWeeks";

import { Day } from "./Day";
import {
  RangePickerComponents,
  RangePickerOnChange,
  RangePickerSelectedDays,
} from "./rangePicker.type";

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
  components?: RangePickerComponents;
  onChange: RangePickerOnChange;
  setSource: Dispatch<SetStateAction<Dayjs>>;
  setHoverDay: Dispatch<SetStateAction<string | undefined>>;
  setSelectedDays: Dispatch<
    SetStateAction<RangePickerSelectedDays | undefined>
  >;
}

export const Months = ({
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
                  hoverDay={hoverDay}
                  setHoverDay={setHoverDay}
                  onChange={onChange}
                  components={components}
                  source={sourceProp}
                  disabled={disabled}
                  disabledDays={disabledDays}
                  key={day.format("YYYY-MM-DD")}
                  selectedDays={selectedDays}
                  setSelectedDays={setSelectedDays}
                  disabledBeforeToday={disabledBeforeToday}
                  disabledBeforeDate={disabledBeforeDate}
                  disabledAfterDate={disabledAfterDate}
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
