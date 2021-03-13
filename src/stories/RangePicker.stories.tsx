import { FORMAT_DATE } from "constant";
import { RangePicker } from "rangePicker";
import { array, boolean, number, withKnobs } from "@storybook/addon-knobs";
import { dayjs } from "libs/dayjs-config";
import { storiesOf } from "@storybook/react";

let selectedDays = {
  from: dayjs().add(2, "day").format(FORMAT_DATE),
  to: dayjs().add(20, "day").format(FORMAT_DATE),
};

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
      disabledBeforeToday={boolean("disabled before today", false)}
      numberOfMonths={number("number of months", 4)}
      selectedDays={selectedDays}
      disabledDays={array("disabled days", disabledDays)}
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

stories.add("Disabled Before Today", () => {
  return (
    <RangePicker
      disabledBeforeToday={boolean("disabled before today", true)}
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
