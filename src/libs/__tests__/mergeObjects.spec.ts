import { describe, expect, it } from "vitest";

import { deepMerge } from "../mergeObjects";

describe("libs - mergeObjects", () => {
  it("returns an empty object when merging empty objects", () => {
    expect(deepMerge({}, {})).toMatchObject({});
  });

  it("merges flat objects", () => {
    expect(deepMerge({ a: 1 }, { a: 2, b: 3 })).toMatchObject({ a: 2, b: 3 });
  });

  it("returns the target when no sources are provided", () => {
    expect(deepMerge({ a: 1 })).toMatchObject({ a: 1 });
  });

  it("deep-merges nested objects", () => {
    expect(
      deepMerge(
        { primary: { main: "#000", dark: "#111" } },
        { primary: { main: "#fff" } },
      ),
    ).toMatchObject({ primary: { main: "#fff", dark: "#111" } });
  });
});
