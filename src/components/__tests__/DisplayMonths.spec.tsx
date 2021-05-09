import { Dayjs } from "dayjs";
import { TestProviders } from "libs/TestProviders";
import { dayjs } from "libs/dayjs-config";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Components - DisplayMonths", () => {
  it("should DisplayMonths work correctly", async () => {
    const setDisplayMonths = jest.fn();
    const setSource = jest.fn();
    await renderDisplayMonths({
      jalali: false,
      source: dayjs(),
      setDisplayMonths,
      setSource,
    });
  });
  it("should DisplayMonths display months gregory", async () => {
    const setDisplayMonths = jest.fn();
    const setSource = jest.fn();
    await renderDisplayMonths({
      jalali: false,
      source: dayjs(),
      setDisplayMonths,
      setSource,
    });
    expect(screen.getAllByTestId("month-item-to-select")).toHaveLength(12);
    expect(screen.getByText("April")).toBeTruthy();
  });

  it("should DisplayMonths display months Jalali", async () => {
    const setDisplayMonths = jest.fn();
    const setSource = jest.fn();
    await renderDisplayMonths({
      jalali: true,
      source: dayjs().calendar("jalali").locale("fa"),
      setDisplayMonths,
      setSource,
    });
    expect(screen.getAllByTestId("month-item-to-select")).toHaveLength(12);
    expect(screen.getByText("اردیبهشت")).toBeTruthy();
  });

  it("should DisplayMonths select a month", async () => {
    const setDisplayMonths = jest.fn();
    const setSource = jest.fn();
    await renderDisplayMonths({
      jalali: false,
      source: dayjs(),
      setDisplayMonths,
      setSource,
    });
    const getFirstItemOfMonth = screen.getAllByTestId(
      "month-item-to-select",
    )[0];
    fireEvent.click(getFirstItemOfMonth);
    expect(setSource).toHaveBeenCalledTimes(1);
    expect(setDisplayMonths).toHaveBeenCalledTimes(1);
  });
});

interface RenderProps {
  source: Dayjs;
  jalali: boolean;
  setSource: (date: Dayjs) => void;
  setDisplayMonths: (date: boolean) => void;
}

const renderDisplayMonths = async ({
  jalali,
  setDisplayMonths,
  setSource,
  source,
}: RenderProps) => {
  const { DisplayMonths } = require("../DisplayMonths");
  return render(
    <TestProviders>
      <DisplayMonths
        jalali={jalali}
        setDisplayMonths={setDisplayMonths}
        setSource={setSource}
        source={source}
      />
    </TestProviders>,
  );
};
