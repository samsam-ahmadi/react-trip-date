import { describe, expect, it } from "vitest";

import { FORMAT_DATE } from "../../constant";
import { dayjs } from "../dayjs-config";
import { getDayFormat } from "../getDayFormat";

describe("libs - getDayFormat", () => {
  it("returns the Gregorian date when input is Jalali", () => {
    expect(getDayFormat(dayjs().calendar("jalali"), true)).toBe(
      dayjs().format(FORMAT_DATE),
    );
  });

  it("returns the Gregorian date when input is Gregorian", () => {
    expect(getDayFormat(dayjs().calendar("gregory"), true)).toBe(
      dayjs().format(FORMAT_DATE),
    );
  });
});
