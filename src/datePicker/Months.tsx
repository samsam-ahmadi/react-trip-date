import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { TitleOfWeek } from "components/TitleOfWeek";
import { createCalendar } from "libs/createCalendar";
import { sliceDaysOfMonthToWeeks } from "libs/sliceDaysOfMonthToWeeks";

import { Day } from "./Day";
import { Month, Weeks, Wrapper } from "./datePicker.style";

interface Props {
  numberOfMonths: number;
  startOfWeek: number;
  jalali: boolean;
  source: Dayjs;
  setSource: Dispatch<SetStateAction<Dayjs>>;
}

export const Months = ({
  numberOfMonths,
  startOfWeek,
  jalali,
  source,
}: Props) => {
  const renderMonths = () => {
    let months = [];
    for (let i = 0; i < numberOfMonths; i++) {
      source = source.add(i, "month");
      const daysInMonth = source.daysInMonth();
      const firstDay = source.startOf("month").day();
      const weeksDays: Dayjs[][] = sliceDaysOfMonthToWeeks(
        createCalendar({
          source: source,
          daysInMonth: daysInMonth,
          firstDay: firstDay,
          startOfWeek: jalali ? 6 : startOfWeek || 0,
        }),
        7,
      );
      months.push(
        <Month
          numberOfMonths={numberOfMonths || 1}
          key={dayjs().set("month", 1).set("day", 1).diff(source)}
          data-test={dayjs().set("month", 1).set("day", 1).diff(source)}
        >
          <TitleOfWeek jalali={jalali} />
          {weeksDays.map(week => (
            <Weeks
              jalali={jalali}
              data-test={dayjs().set("month", 1).set("day", 1).diff(week[0])}
              key={dayjs().set("month", 1).set("day", 1).diff(week[0])}
            >
              {week.map(day => (
                <Day day={day} key={day.format("MM-DD-dddd")} />
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
