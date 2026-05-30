import { describe, expect, it } from "vitest";

import { sliceDaysOfMonthToWeeks } from "../sliceDaysOfMonthToWeeks";

describe("libs - sliceDaysOfMonthToWeeks", () => {
  it("returns one week for 5 days", () => {
    expect(sliceDaysOfMonthToWeeks(Array(5).fill(""), 7)).toHaveLength(1);
  });

  it("returns 5 weeks for 30 days", () => {
    expect(sliceDaysOfMonthToWeeks(Array(30).fill(""), 7)).toHaveLength(5);
  });

  it("returns 6 weeks for 36 days", () => {
    expect(sliceDaysOfMonthToWeeks(Array(36).fill(""), 7)).toHaveLength(6);
  });

  it("returns 6 weeks for 41 days", () => {
    expect(sliceDaysOfMonthToWeeks(Array(41).fill(""), 7)).toHaveLength(6);
  });

  it("returns 6 chunks of size 1 for 6 days", () => {
    expect(sliceDaysOfMonthToWeeks(Array(6).fill(""), 1)).toHaveLength(6);
  });
});
