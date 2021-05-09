import { FORMAT_DATE } from "constant";
import { dayjs } from "libs/dayjs-config";
import { dayjsLocalized } from "libs/dayjsLocalized";

describe("libs - dayjsLocalized", () => {
  it("expect work correctly if calendar is Jalali", () => {
    expect(dayjsLocalized(true).format(FORMAT_DATE)).toBe(
      dayjs().calendar("jalali").format(FORMAT_DATE),
    );
  });

  it("expect work correctly if calendar is gregory", () => {
    expect(dayjsLocalized(false).format(FORMAT_DATE)).toBe(
      dayjs().calendar("gregory").format(FORMAT_DATE),
    );
  });
});
