import { sliceDaysOfMonthToWeeks } from "libs/sliceDaysOfMonthToWeeks";

describe("libs - sliceDaysOfMonthToWeeks", () => {
  it("expect work correctly with array of 5 items", () => {
    expect(sliceDaysOfMonthToWeeks(Array(5).fill(""), 7)).toHaveLength(1);
  });

  it("expect work correctly with array of 30 items", () => {
    expect(sliceDaysOfMonthToWeeks(Array(30).fill(""), 7)).toHaveLength(5);
  });

  it("expect work correctly with array of 36 items", () => {
    expect(sliceDaysOfMonthToWeeks(Array(36).fill(""), 7)).toHaveLength(6);
  });

  it("expect work correctly with array of 41 items", () => {
    expect(sliceDaysOfMonthToWeeks(Array(41).fill(""), 7)).toHaveLength(6);
  });

  it("expect work correctly with array of 6 items", () => {
    expect(sliceDaysOfMonthToWeeks(Array(6).fill(""), 1)).toHaveLength(6);
  });
});
