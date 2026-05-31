import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DatePicker } from "../DatePicker";

describe("DatePicker", () => {
  it("renders with role=group and aria-label", () => {
    render(<DatePicker onChange={vi.fn()} autoResponsive={false} />);
    expect(
      screen.getByRole("group", { name: /date picker/i }),
    ).toBeInTheDocument();
  });

  it("renders 1 month grid by default", () => {
    render(<DatePicker onChange={vi.fn()} autoResponsive={false} />);
    expect(screen.getAllByRole("grid")).toHaveLength(1);
  });

  it("renders N month grids when numberOfMonths is set", () => {
    render(
      <DatePicker
        onChange={vi.fn()}
        numberOfMonths={3}
        autoResponsive={false}
      />,
    );
    expect(screen.getAllByRole("grid")).toHaveLength(3);
  });

  it("calls onChange exactly once when a day is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DatePicker
        onChange={onChange}
        autoResponsive={false}
        initialMonthAndYear="2024-03-01"
      />,
    );
    const grid = screen.getAllByRole("grid")[0];
    const day15 = within(grid).getByRole("gridcell", {
      name: /March 15, 2024/i,
    });
    await user.click(day15);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(["2024-03-15"]);
  });

  it("does not fire onChange when clicking a date inside disabledDays", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DatePicker
        onChange={onChange}
        autoResponsive={false}
        initialMonthAndYear="2024-03-01"
        disabledDays={["2024-03-15"]}
      />,
    );
    const day15 = within(screen.getAllByRole("grid")[0]).getByRole("gridcell", {
      name: /March 15, 2024/i,
    });
    await user.click(day15);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not fire onChange when clicking a date before disabledBeforeDate", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DatePicker
        onChange={onChange}
        autoResponsive={false}
        initialMonthAndYear="2024-03-15"
        disabledBeforeDate="2024-03-10"
      />,
    );
    const day5 = within(screen.getAllByRole("grid")[0]).getByRole("gridcell", {
      name: /March 5, 2024/i,
    });
    await user.click(day5);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("deselects a previously selected day", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DatePicker
        onChange={onChange}
        autoResponsive={false}
        initialMonthAndYear="2024-03-01"
        selectedDays={["2024-03-15"]}
      />,
    );
    const day15 = within(screen.getAllByRole("grid")[0]).getByRole("gridcell", {
      name: /March 15, 2024/i,
    });
    await user.click(day15);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("respects numberOfSelectableDays=1 (single-date mode)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DatePicker
        onChange={onChange}
        autoResponsive={false}
        initialMonthAndYear="2024-03-01"
        selectedDays={["2024-03-10"]}
        numberOfSelectableDays={1}
      />,
    );
    const day15 = within(screen.getAllByRole("grid")[0]).getByRole("gridcell", {
      name: /March 15, 2024/i,
    });
    await user.click(day15);
    expect(onChange).toHaveBeenLastCalledWith(["2024-03-15"]);
  });

  it("disables days before disabledBeforeDate", () => {
    render(
      <DatePicker
        onChange={vi.fn()}
        autoResponsive={false}
        initialMonthAndYear="2024-03-15"
        disabledBeforeDate="2024-03-10"
      />,
    );
    const day5 = within(screen.getAllByRole("grid")[0]).getByRole("gridcell", {
      name: /March 5, 2024/i,
    });
    expect(day5).toHaveAttribute("aria-disabled", "true");
  });

  it("disables days after disabledAfterDate", () => {
    render(
      <DatePicker
        onChange={vi.fn()}
        autoResponsive={false}
        initialMonthAndYear="2024-03-15"
        disabledAfterDate="2024-03-20"
      />,
    );
    const day25 = within(screen.getAllByRole("grid")[0]).getByRole("gridcell", {
      name: /March 25, 2024/i,
    });
    expect(day25).toHaveAttribute("aria-disabled", "true");
  });

  it("ignores clicks on disabled days", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DatePicker
        onChange={onChange}
        autoResponsive={false}
        initialMonthAndYear="2024-03-15"
        disabled
      />,
    );
    const day15 = within(screen.getAllByRole("grid")[0]).getByRole("gridcell", {
      name: /March 15, 2024/i,
    });
    await user.click(day15);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("fires onRangeDateInScreen with month bounds", () => {
    const onRangeDateInScreen = vi.fn();
    render(
      <DatePicker
        onChange={vi.fn()}
        onRangeDateInScreen={onRangeDateInScreen}
        autoResponsive={false}
        initialMonthAndYear="2024-03-01"
      />,
    );
    expect(onRangeDateInScreen).toHaveBeenCalled();
    const last = onRangeDateInScreen.mock.calls.at(-1)![0];
    expect(last.start).toMatch(/2024-03-01/);
    expect(last.end).toMatch(/2024-03-31/);
  });

  it("navigates to the next month via the header next button", async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        onChange={vi.fn()}
        autoResponsive={false}
        initialMonthAndYear="2024-03-01"
      />,
    );
    await user.click(
      screen.getByRole("button", { name: /Next month, March 2024/i }),
    );
    expect(
      screen.getByRole("grid", { name: /April 2024/i }),
    ).toBeInTheDocument();
  });

  it("ArrowRight moves focus to the next day", async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        onChange={vi.fn()}
        autoResponsive={false}
        initialMonthAndYear="2024-03-01"
        selectedDays={["2024-03-15"]}
      />,
    );
    const day15 = within(screen.getAllByRole("grid")[0]).getByRole("gridcell", {
      name: /March 15, 2024/i,
    });
    day15.focus();
    await user.keyboard("{ArrowRight}");
    const day16 = within(screen.getAllByRole("grid")[0]).getByRole("gridcell", {
      name: /March 16, 2024/i,
    });
    expect(day16).toHaveAttribute("tabIndex", "0");
  });

  it("Enter on a focused day selects it", () => {
    const onChange = vi.fn();
    render(
      <DatePicker
        onChange={onChange}
        autoResponsive={false}
        initialMonthAndYear="2024-03-01"
      />,
    );
    const day1 = within(screen.getAllByRole("grid")[0]).getByRole("gridcell", {
      name: /March 1, 2024/i,
    });
    day1.focus();
    fireEvent.keyDown(day1, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(["2024-03-01"]);
  });
});
