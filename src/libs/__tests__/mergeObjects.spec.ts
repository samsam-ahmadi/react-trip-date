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

  it("does not mutate the target object", () => {
    const target = { primary: { main: "#000", dark: "#111" } };
    deepMerge(target, { primary: { main: "#fff" } });
    expect(target).toEqual({ primary: { main: "#000", dark: "#111" } });
  });

  it("does not mutate the target's nested objects (shared-reference safe)", () => {
    const sharedPrimary = { main: "#000", dark: "#111" };
    const target = { primary: sharedPrimary };
    deepMerge(target, { primary: { main: "#fff" } });
    expect(sharedPrimary).toEqual({ main: "#000", dark: "#111" });
  });

  it("does not mutate the source object", () => {
    const source = { primary: { main: "#fff" } };
    deepMerge({ primary: { main: "#000" } }, source);
    expect(source).toEqual({ primary: { main: "#fff" } });
  });

  it("repeated merges with the same theme yield equivalent results (no drift)", () => {
    const base = { primary: { main: "#000", dark: "#111" } };
    const override = { primary: { main: "#fff" } };
    const first = deepMerge(base, override);
    const second = deepMerge(base, override);
    expect(first).toEqual(second);
    expect(base).toEqual({ primary: { main: "#000", dark: "#111" } });
  });
});
