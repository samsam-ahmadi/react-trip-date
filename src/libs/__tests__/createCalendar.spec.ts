import { describe, expect, it } from "vitest";

import { createCalendar } from "../createCalendar";
import { dayjs } from "../dayjs-config";

describe("libs - createCalendar", () => {
  it("returns full weeks for February 2021 with Sunday start", () => {
    expect(
      createCalendar({ source: dayjs("2021-02-02"), startOfWeek: 0 }),
    ).toHaveLength(35);
  });

  it("returns full weeks for a leap February", () => {
    const days = createCalendar({
      source: dayjs("2024-02-15"),
      startOfWeek: 1,
    });
    expect(days.length % 7).toBe(0);
  });

  it("starts the grid on the configured start-of-week", () => {
    const days = createCalendar({
      source: dayjs("2024-03-15"),
      startOfWeek: 1,
    });
    expect(days[0].day()).toBe(1);
  });
});
