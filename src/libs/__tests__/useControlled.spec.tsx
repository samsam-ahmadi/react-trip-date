import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useControlled } from "../useControlled";

describe("libs - useControlled", () => {
  it("acts as uncontrolled when no value is provided", () => {
    const { result } = renderHook(() =>
      useControlled<number>(undefined, 0, undefined),
    );
    expect(result.current[0]).toBe(0);
    act(() => result.current[1](5));
    expect(result.current[0]).toBe(5);
  });

  it("stays controlled when a value is provided", () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useControlled(value, 0, onChange),
      { initialProps: { value: 10 } },
    );
    expect(result.current[0]).toBe(10);
    act(() => result.current[1](42));
    expect(onChange).toHaveBeenCalledWith(42);
    expect(result.current[0]).toBe(10);
    rerender({ value: 42 });
    expect(result.current[0]).toBe(42);
  });

  it("invokes onChange exactly once per setValue call", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControlled<string[]>(undefined, [], onChange),
    );
    act(() => result.current[1](["2024-01-01"]));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(["2024-01-01"]);
  });

  it("supports functional updates against the latest controlled value", () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }: { value: number[] }) =>
        useControlled(value, [] as number[], onChange),
      { initialProps: { value: [1, 2] } },
    );
    act(() => result.current[1](prev => [...prev, 3]));
    expect(onChange).toHaveBeenCalledWith([1, 2, 3]);
    rerender({ value: [1, 2, 3] });
    expect(result.current[0]).toEqual([1, 2, 3]);
  });
});
