import React from "react";
import { array, boolean, number, withKnobs } from "@storybook/addon-knobs";
import { dayjs } from "libs/dayjs-config";
import { storiesOf } from "@storybook/react";

import { DatePicker } from "../datePicker";

const format = "YYYY-MM-DD";

let selectedDays = [
  dayjs().add(2, "day").format(format),
  dayjs().add(6, "day").format(format),
  dayjs().add(15, "day").format(format),
];
let disabledDays = [
  dayjs().add(3, "day").format(format),
  dayjs().add(9, "day").format(format),
  dayjs().add(25, "day").format(format),
  dayjs().add(40, "day").format(format),
  dayjs().add(-2, "day").format(format),
  dayjs().add(-9, "day").format(format),
  dayjs().add(-10, "day").format(format),
];

const stories = storiesOf("Date Picker Component", module).addDecorator(
  withKnobs,
);

stories.add("All Props", () => {
  return (
    <DatePicker
      jalali={boolean("jalali", false)}
      disabledBeforeToday={boolean("disabled before today", false)}
      numberOfMonths={number("number of months", 4)}
      numberOfSelectableDays={number("number of selectable days", 5)}
      selectedDays={array("selected days", selectedDays)}
      disabledDays={array("disabled days", disabledDays)}
      onChange={dates => console.log("dates", dates)}
    />
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
