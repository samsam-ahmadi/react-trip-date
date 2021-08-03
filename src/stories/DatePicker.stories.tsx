import {
  array,
  boolean,
  number,
  text,
} from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import { DatePicker } from "datePicker";
import { FORMAT_DATE } from "constant";
import { dayjs } from "libs/dayjs-config";

const format = "YYYY-MM-DD";

const disabledBeforeDate = dayjs().subtract(2, "day").format(FORMAT_DATE);
const disabledAfterDate = dayjs().subtract(-21, "day").format(FORMAT_DATE);

const initialMonthAndYear = dayjs().subtract(1, "year").format(FORMAT_DATE);

const selectedDays = [
  dayjs().subtract(-2, "day").format(format),
  dayjs().subtract(-6, "day").format(format),
  dayjs().subtract(-15, "day").format(format),
];
let disabledDays = [
  dayjs().subtract(-3, "day").format(format),
  dayjs().subtract(-9, "day").format(format),
  dayjs().subtract(-25, "day").format(format),
  dayjs().subtract(-40, "day").format(format),
  dayjs().subtract(2, "day").format(format),
  dayjs().subtract(9, "day").format(format),
  dayjs().subtract(10, "day").format(format),
];

const stories = storiesOf("Date Picker Component", module);

stories.add("All Props", () => {
  return (
    <DatePicker
      jalali={boolean("jalali", false)}
      startOfWeek={number("start of week", 0)}
      disabled={boolean("disabled", false)}
      autoResponsive={boolean("auto responsive", true)}
      disabledBeforeToday={boolean("disabled before today", false)}
      disabledBeforeDate={text("disabled before date", disabledBeforeDate)}
      disabledAfterDate={text("disabled after date", disabledAfterDate)}
      numberOfMonths={number("number of months", 4)}
      initialMonthAndYear={text("initial month and year", initialMonthAndYear)}
      onRangeDateInScreen={window => console.log("window changed", window)}
      numberOfSelectableDays={number("number of selectable days", 5)}
      selectedDays={array("selected days", selectedDays)}
      disabledDays={array("disabled days", disabledDays)}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Theme", () => {
  const theme = {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
    },
    grey: {
      700: "#707070",
      900: "#1b1b1d",
    },
    background: {
      default: "#f5f5f5",
    },
    text: {
      disabled: "#BABABA",
    },
  };

  return (
    <DatePicker theme={theme} onChange={dates => console.log("dates", dates)} />
  );
});

stories.add("Simple", () => {
  return <DatePicker onChange={dates => console.log("dates", dates)} />;
});

stories.add("Jalali", () => {
  return <DatePicker jalali onChange={dates => console.log("dates", dates)} />;
});

stories.add("Multiple Month", () => {
  return (
    <DatePicker
      numberOfMonths={2}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Auto Responsive", () => {
  return (
    <DatePicker
      numberOfMonths={2}
      autoResponsive={boolean("auto responsive", true)}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Initial Month/Year and onRangeDateInScreen callback", () => {
  return (
    <DatePicker
      initialMonthAndYear={text("initial month and year", initialMonthAndYear)}
      onRangeDateInScreen={window => console.log("window changed", window)}
      numberOfMonths={number("number of months", 2)}
      jalali={boolean("jalali", false)}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Disabled Calendar", () => {
  return (
    <div>
      <DatePicker
        disabled={boolean("disabled", true)}
        onChange={dates => console.log("dates", dates)}
      />
    </div>
  );
});

stories.add("Disabled Before Today", () => {
  return (
    <div>
      <DatePicker
        numberOfMonths={2}
        disabledBeforeToday
        onChange={dates => console.log("dates", dates)}
      />
    </div>
  );
});

stories.add("Disabled Before Date and Disabled after Date", () => {
  return (
    <DatePicker
      numberOfMonths={2}
      disabledBeforeDate={text("disabled before", disabledBeforeDate)}
      disabledAfterDate={text("disabled after", disabledAfterDate)}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Disabled Before Today and Disabled Before Date", () => {
  return (
    <DatePicker
      numberOfMonths={2}
      disabledBeforeToday={boolean("disabled before today", true)}
      disabledBeforeDate={text("disabled before", disabledBeforeDate)}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Disabled Days", () => {
  return (
    <DatePicker
      numberOfMonths={2}
      disabledDays={disabledDays}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Selected Days", () => {
  return (
    <DatePicker
      numberOfMonths={2}
      selectedDays={selectedDays}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Number of Selectable Days", () => {
  return (
    <DatePicker
      numberOfMonths={2}
      numberOfSelectableDays={5}
      selectedDays={selectedDays}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Custom components - Title of weeks Component", () => {
  return (
    <DatePicker
      components={{
        titleOfWeek: {
          wrapper: ({ jalali }) => (
            <div>This is a custom title of weeks component</div>
          ),
        },
      }}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Custom components - Header Icons component", () => {
  return (
    <DatePicker
      components={{
        header: {
          monthIcons: {
            right: <span>next month</span>,
            left: <span>prev month</span>,
          },
          yearIcons: {
            right: <span>next year</span>,
            left: <span>prev year</span>,
          },
        },
      }}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Custom components - Header titles", () => {
  return (
    <DatePicker
      jalali={boolean("jalali", false)}
      startOfWeek={number("start of week", 0)}
      components={{
        titleOfWeek: {
          titles: ["1", "2", "3", "4", "5", "6", "7"],
        },
      }}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Custom components - Header Calendar format", () => {
  return (
    <DatePicker
      components={{
        header: {
          format: "YY**MMMM",
        },
      }}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Custom components - Day", () => {
  return (
    <DatePicker
      components={{
        days: ({ day, jalali }) => <div style={{ color: "red" }}>{day}</div>,
      }}
      onChange={dates => console.log("dates", dates)}
    />
  );
});
