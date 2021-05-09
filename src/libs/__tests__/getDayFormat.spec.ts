import { FORMAT_DATE } from "constant";
import { dayjs } from "libs/dayjs-config";
import { getDayFormat } from "libs/getDayFormat";

describe("libs - getDayFormat", () => {
  it("expect work correctly if calendar is Jalali", () => {
    expect(getDayFormat(dayjs().calendar("jalali"), true)).toBe(
      dayjs().format(FORMAT_DATE),
    );
  });

  it("expect work correctly if calendar is gregory", () => {
    expect(getDayFormat(dayjs().calendar("gregory"), true)).toBe(
      dayjs().format(FORMAT_DATE),
    );
  });
});
