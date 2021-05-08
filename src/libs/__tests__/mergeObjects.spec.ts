import { deepMerge } from "libs/mergeObjects";

describe("libs - mergeObjects", () => {
  it("expect return empty if Objects are empty", () => {
    expect(deepMerge({}, {})).toMatchObject({});
  });

  it("expect return combine objects truly", () => {
    expect(deepMerge({ a: 1 }, { a: 2, b: 3 })).toMatchObject({ a: 2, b: 3 });
  });

  it("expect return combine objects truly if source object is empty", () => {
    expect(deepMerge({ a: 1 })).toMatchObject({ a: 1 });
  });
});
