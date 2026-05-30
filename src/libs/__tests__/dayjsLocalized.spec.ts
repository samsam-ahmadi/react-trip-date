import { describe, expect, it } from "vitest";

import { FORMAT_DATE } from "../../constant";
import { dayjs } from "../dayjs-config";
import { dayjsLocalized } from "../dayjsLocalized";

describe("libs - dayjsLocalized", () => {
  it("returns today in Jalali when jalali=true", () => {
    expect(dayjsLocalized(true).format(FORMAT_DATE)).toBe(
      dayjs().calendar("jalali").format(FORMAT_DATE),
    );
  });

  it("returns today in Gregorian when jalali=false", () => {
    expect(dayjsLocalized(false).format(FORMAT_DATE)).toBe(
      dayjs().calendar("gregory").format(FORMAT_DATE),
    );
  });

  it("respects the supplied locale", () => {
    expect(dayjsLocalized(false, undefined, "de").locale()).toBe("de");
  });
});
