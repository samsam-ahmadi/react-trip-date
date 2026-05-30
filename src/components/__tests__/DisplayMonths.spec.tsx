import { fireEvent, render, screen } from "@testing-library/react";
import { Dayjs } from "dayjs";
import { describe, expect, it, vi } from "vitest";

import { dayjs } from "../../libs/dayjs-config";
import { TestProviders } from "../../libs/TestProviders";
import { DisplayMonths } from "../DisplayMonths";

interface RenderProps {
  source: Dayjs;
  jalali: boolean;
  setSource: (date: Dayjs) => void;
  setDisplayMonths: (open: boolean) => void;
}

const renderDisplayMonths = ({
  jalali,
  setDisplayMonths,
  setSource,
  source,
}: RenderProps) =>
  render(
    <TestProviders>
      <DisplayMonths
        jalali={jalali}
        setDisplayMonths={
          setDisplayMonths as unknown as React.Dispatch<
            React.SetStateAction<boolean>
          >
        }
        setSource={
          setSource as unknown as React.Dispatch<React.SetStateAction<Dayjs>>
        }
        source={source}
      />
    </TestProviders>,
  );

describe("Components - DisplayMonths", () => {
  it("renders without crashing", () => {
    renderDisplayMonths({
      jalali: false,
      source: dayjs(),
      setDisplayMonths: vi.fn(),
      setSource: vi.fn(),
    });
    expect(screen.getAllByTestId("month-item-to-select")).toHaveLength(12);
  });

  it("renders 12 gregorian months", () => {
    renderDisplayMonths({
      jalali: false,
      source: dayjs(),
      setDisplayMonths: vi.fn(),
      setSource: vi.fn(),
    });
    expect(screen.getAllByTestId("month-item-to-select")).toHaveLength(12);
    expect(screen.getByText("April")).toBeInTheDocument();
  });

  it("renders 12 jalali months", () => {
    renderDisplayMonths({
      jalali: true,
      source: dayjs().calendar("jalali").locale("fa"),
      setDisplayMonths: vi.fn(),
      setSource: vi.fn(),
    });
    expect(screen.getAllByTestId("month-item-to-select")).toHaveLength(12);
    expect(screen.getByText("اردیبهشت")).toBeInTheDocument();
  });

  it("invokes setSource and setDisplayMonths when a month is clicked", () => {
    const setSource = vi.fn();
    const setDisplayMonths = vi.fn();
    renderDisplayMonths({
      jalali: false,
      source: dayjs(),
      setDisplayMonths,
      setSource,
    });
    fireEvent.click(screen.getAllByTestId("month-item-to-select")[0]);
    expect(setSource).toHaveBeenCalledTimes(1);
    expect(setDisplayMonths).toHaveBeenCalledTimes(1);
  });
});
