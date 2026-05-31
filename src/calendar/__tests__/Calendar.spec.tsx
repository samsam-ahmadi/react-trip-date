import { render } from "@testing-library/react";
import { Dayjs } from "dayjs";
import { describe, expect, it } from "vitest";

import { Calendar } from "../Calendar";

describe("Calendar", () => {
  it("yields weeks of 7 days each to the render prop", () => {
    let captured: Dayjs[][] = [];
    render(
      <Calendar jalali={false} startOfWeek={1}>
        {weeks => {
          captured = weeks;
          return null;
        }}
      </Calendar>,
    );
    expect(captured.length).toBeGreaterThanOrEqual(4);
    captured.forEach(week => expect(week).toHaveLength(7));
  });

  it("yields jalali weeks when jalali=true", () => {
    let captured: Dayjs[][] = [];
    render(
      <Calendar jalali>
        {weeks => {
          captured = weeks;
          return null;
        }}
      </Calendar>,
    );
    expect(captured.length).toBeGreaterThanOrEqual(4);
    captured.forEach(week => expect(week).toHaveLength(7));
  });
});
