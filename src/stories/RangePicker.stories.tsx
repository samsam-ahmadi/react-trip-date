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

let initialMonthAndYear = dayjs().subtract(1, "year").format(FORMAT_DATE);

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
      startOfWeek={number("start of week", 0)}
      autoResponsive={boolean("auto responsive", true)}
      disabledBeforeToday={boolean("disabled before today", false)}
      disabledBeforeDate={text("disabled before date", disabledBeforeDate)}
      disabledAfterDate={text("disabled after date", disabledAfterDate)}
      numberOfMonths={number("number of months", 4)}
      initialMonthAndYear={text("initial month and year", initialMonthAndYear)}
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
      initialMonthAndYear={text("initial month and year", initialMonthAndYear)}
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

stories.add("Allow Disabled Days Span", () => {
  return (
    <RangePicker
      numberOfMonths={1}
      allowDisabledDaysSpan
      autoResponsive={false}
      initialMonthAndYear="2021-08"
      onChange={dates => window.console.log(dates)}
      disabledDays={[
        "2021-08-01",
        "2021-08-02",
        "2021-08-03",
        "2021-08-04",
        "2021-08-05",
        "2021-08-06",
        "2021-08-08",
        "2021-08-09",
        "2021-08-10",
        "2021-08-11",
        "2021-08-12",
        "2021-08-13",
        "2021-08-15",
        "2021-08-16",
        "2021-08-17",
        "2021-08-18",
        "2021-08-19",
        "2021-08-20",
        "2021-08-22",
        "2021-08-23",
        "2021-08-24",
        "2021-08-25",
        "2021-08-26",
        "2021-08-27",
        "2021-08-29",
        "2021-08-30",
        "2021-08-31",
      ]}
    />
  );
});

stories.add("Custom components - Title of weeks Component", () => {
  return (
    <RangePicker
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
    <RangePicker
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
