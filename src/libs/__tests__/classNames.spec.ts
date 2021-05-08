import { classNames } from "libs/classNames";

describe("libs - className", () => {
  it("return empty if classes are falsy", () => {
    expect(
      classNames({ falsy: false, nan: NaN, undefinedKey: undefined, zero: 0 }),
    ).toBe("");
  });

  it("return classes if some of them are truly", () => {
    expect(classNames({ true: true, validClass: true, validNumber: 2 })).toBe(
      "true validClass validNumber",
    );
  });
});
