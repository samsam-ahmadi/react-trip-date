import { FORMAT_DATE } from "constant";
import { RangePicker } from "rangePicker";
import {
  array,
  boolean,
  number,
  text,
  withKnobs,
} from "@storybook/addon-knobs";
import { dayjs } from "libs/dayjs-config";
import { storiesOf } from "@storybook/react";

let selectedDays = {
  from: dayjs().add(2, "day").format(FORMAT_DATE),
  to: dayjs().add(20, "day").format(FORMAT_DATE),
};

let disabledBeforeDate = dayjs().subtract(2, "day").format(FORMAT_DATE);
let disabledAfterDate = dayjs().add(21, "day").format(FORMAT_DATE);

let initialMonth = dayjs().month();
let initialYear = dayjs().year();

let disabledDays = [
  dayjs().add(3, "day").format(FORMAT_DATE),
  dayjs().add(9, "day").format(FORMAT_DATE),
  dayjs().add(25, "day").format(FORMAT_DATE),
  dayjs().add(40, "day").format(FORMAT_DATE),
  dayjs().add(-2, "day").format(FORMAT_DATE),
  dayjs().add(-9, "day").format(FORMAT_DATE),
  dayjs().add(-10, "day").format(FORMAT_DATE),
];

const stories = storiesOf("Range Picker Component", module).addDecorator(
  withKnobs,
);

stories.add("All Props", () => {
  return (
    <RangePicker
      jalali={boolean("jalali", false)}
      disabled={boolean("disabled", false)}
      autoResponsive={boolean("auto responsive", true)}
      disabledBeforeToday={boolean("disabled before today", false)}
      disabledBeforeDate={text("disabled before date", disabledBeforeDate)}
      disabledAfterDate={text("disabled after date", disabledAfterDate)}
      numberOfMonths={number("number of months", 4)}
      initialMonthAndYear={{
        month: number("initial month", initialMonth),
        year: number("initial year", initialYear),
      }}
      onRangeDateInScreen={window => console.log("window changed", window)}
      selectedDays={selectedDays}
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
    <RangePicker
      theme={theme}
      onChange={dates => console.log("dates", dates)}
    />
  );
});
stories.add("Jalali", () => {
  return (
    <RangePicker
      jalali={boolean("jalali", true)}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Disabled Calendar", () => {
  return (
    <RangePicker
      disabled={boolean("disabled", true)}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Disabled Before Today", () => {
  return (
    <RangePicker
      disabledBeforeToday={boolean("disabled before today", true)}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Disabled Before Date and Disabled after Date", () => {
  return (
    <RangePicker
      disabledBeforeDate={text("disabled before", disabledBeforeDate)}
      disabledAfterDate={text("disabled after", disabledAfterDate)}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Disabled Before Today and Disabled Before Date", () => {
  return (
    <RangePicker
      disabledBeforeToday={boolean("disabled before today", true)}
      disabledBeforeDate={text("disabled before", disabledBeforeDate)}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Number Of Months", () => {
  return (
    <RangePicker
      numberOfMonths={number("number of months", 3)}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Auto Responsive", () => {
  return (
    <RangePicker
      autoResponsive={boolean("auto responsive", true)}
      numberOfMonths={number("number of months", 4)}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Initial Month/Year and onRangeDateInScreen callback", () => {
  return (
    <RangePicker
      initialMonthAndYear={{
        month: number("initial month", initialMonth),
        year: number("initial year", initialYear),
      }}
      onRangeDateInScreen={window => console.log("window changed", window)}
      numberOfMonths={number("number of months", 2)}
      jalali={boolean("jalali", false)}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Selected Days", () => {
  return (
    <RangePicker
      selectedDays={selectedDays}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Disabled Days", () => {
  return (
    <RangePicker
      disabledDays={array("disabled days", disabledDays)}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Custom components - Header component", () => {
  return (
    <RangePicker
      components={{
        titleOfWeek: {
          wrapper: ({ jalali }) => (
            <div>this is a custom title of weeks component</div>
          ),
        },
      }}
      onChange={dates => console.log("dates", dates)}
    />
  );
});

stories.add("Custom components - Header titles", () => {
  return (
    <RangePicker
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
    <RangePicker
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
    <RangePicker
      components={{
        days: ({ day }) => <div style={{ color: "red" }}>{day}</div>,
      }}
      onChange={dates => console.log("dates", dates)}
    />
  );
});
