import { createCalendar } from "libs/createCalendar";
import { dayjs } from "libs/dayjs-config";

describe("libs - createCalendar", () => {
  it("expect work correctly and return days of month", () => {
    expect(
      createCalendar({ source: dayjs("2021-02-02"), startOfWeek: 0 }),
    ).toHaveLength(35);
  });
});
