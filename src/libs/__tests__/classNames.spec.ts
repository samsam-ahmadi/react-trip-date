import { describe, expect, it } from "vitest";

import { classNames } from "../classNames";

describe("libs - classNames", () => {
  it("returns empty string for falsy values", () => {
    expect(
      classNames({ falsy: false, nan: NaN, undefinedKey: undefined, zero: 0 }),
    ).toBe("");
  });

  it("returns truthy class names joined", () => {
    expect(classNames({ true: true, validClass: true, validNumber: 2 })).toBe(
      "true validClass validNumber",
    );
  });
});
