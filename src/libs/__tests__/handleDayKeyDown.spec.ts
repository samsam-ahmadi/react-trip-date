import { KeyboardEvent } from "react";
import { describe, expect, it, vi } from "vitest";

import { dayjs } from "../dayjs-config";
import { handleDayKeyDown } from "../handleDayKeyDown";

const fakeEvent = (key: string, shiftKey = false) =>
  ({
    key,
    shiftKey,
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
  }) as unknown as KeyboardEvent<HTMLElement>;

describe("libs - handleDayKeyDown", () => {
  it("returns false for non-navigation keys", () => {
    const setSource = vi.fn();
    const setFocusedDate = vi.fn();
    const handled = handleDayKeyDown(fakeEvent("a"), {
      day: dayjs("2024-03-15"),
      source: dayjs("2024-03-01"),
      setSource,
      setFocusedDate,
    });
    expect(handled).toBe(false);
    expect(setFocusedDate).not.toHaveBeenCalled();
  });

  it("moves focus right by one day on ArrowRight", () => {
    const setFocusedDate = vi.fn();
    handleDayKeyDown(fakeEvent("ArrowRight"), {
      day: dayjs("2024-03-15"),
      source: dayjs("2024-03-01"),
      setSource: vi.fn(),
      setFocusedDate,
    });
    expect(setFocusedDate).toHaveBeenCalledWith("2024-03-16");
  });

  it("moves focus up by one week on ArrowUp", () => {
    const setFocusedDate = vi.fn();
    handleDayKeyDown(fakeEvent("ArrowUp"), {
      day: dayjs("2024-03-15"),
      source: dayjs("2024-03-01"),
      setSource: vi.fn(),
      setFocusedDate,
    });
    expect(setFocusedDate).toHaveBeenCalledWith("2024-03-08");
  });

  it("PageDown moves by one month", () => {
    const setFocusedDate = vi.fn();
    const setSource = vi.fn();
    handleDayKeyDown(fakeEvent("PageDown"), {
      day: dayjs("2024-03-15"),
      source: dayjs("2024-03-01"),
      setSource,
      setFocusedDate,
    });
    expect(setFocusedDate).toHaveBeenCalledWith("2024-04-15");
    expect(setSource).toHaveBeenCalled();
  });

  it("Shift + PageDown moves by one year", () => {
    const setFocusedDate = vi.fn();
    const setSource = vi.fn();
    handleDayKeyDown(fakeEvent("PageDown", true), {
      day: dayjs("2024-03-15"),
      source: dayjs("2024-03-01"),
      setSource,
      setFocusedDate,
    });
    expect(setFocusedDate).toHaveBeenCalledWith("2025-03-15");
    expect(setSource).toHaveBeenCalled();
  });

  it("crossing the month boundary updates the source", () => {
    const setSource = vi.fn();
    handleDayKeyDown(fakeEvent("ArrowRight"), {
      day: dayjs("2024-03-31"),
      source: dayjs("2024-03-01"),
      setSource,
      setFocusedDate: vi.fn(),
    });
    expect(setSource).toHaveBeenCalled();
  });

  it("does not update source when next day is in the same month", () => {
    const setSource = vi.fn();
    handleDayKeyDown(fakeEvent("ArrowRight"), {
      day: dayjs("2024-03-15"),
      source: dayjs("2024-03-01"),
      setSource,
      setFocusedDate: vi.fn(),
    });
    expect(setSource).not.toHaveBeenCalled();
  });
});
