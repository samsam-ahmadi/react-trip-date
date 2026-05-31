import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RangePicker } from "../RangePicker";

describe("RangePicker", () => {
  it("renders with role=group and aria-label", () => {
    render(<RangePicker onChange={vi.fn()} autoResponsive={false} />);
    expect(
      screen.getByRole("group", { name: /date range picker/i }),
    ).toBeInTheDocument();
  });

  it("first click sets the from date", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RangePicker
        onChange={onChange}
        autoResponsive={false}
        initialMonthAndYear="2024-03-01"
      />,
    );
    const day5 = within(screen.getAllByRole("grid")[0]).getByRole("gridcell", {
      name: /March 5, 2024/i,
    });
    await user.click(day5);
    expect(onChange).toHaveBeenLastCalledWith({ from: "2024-03-05", to: "" });
  });

  it("second click sets the to date", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RangePicker
        onChange={onChange}
        autoResponsive={false}
        initialMonthAndYear="2024-03-01"
      />,
    );
    const grid = screen.getAllByRole("grid")[0];
    await user.click(
      within(grid).getByRole("gridcell", { name: /March 5, 2024/i }),
    );
    await user.click(
      within(grid).getByRole("gridcell", { name: /March 12, 2024/i }),
    );
    expect(onChange).toHaveBeenLastCalledWith({
      from: "2024-03-05",
      to: "2024-03-12",
    });
  });

  it("swaps from/to if the user picks an earlier second date", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RangePicker
        onChange={onChange}
        autoResponsive={false}
        initialMonthAndYear="2024-03-01"
      />,
    );
    const grid = screen.getAllByRole("grid")[0];
    await user.click(
      within(grid).getByRole("gridcell", { name: /March 12, 2024/i }),
    );
    await user.click(
      within(grid).getByRole("gridcell", { name: /March 5, 2024/i }),
    );
    expect(onChange).toHaveBeenLastCalledWith({
      from: "2024-03-05",
      to: "2024-03-12",
    });
  });

  it("third click resets to a new from date", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RangePicker
        onChange={onChange}
        autoResponsive={false}
        initialMonthAndYear="2024-03-01"
        selectedDays={{ from: "2024-03-05", to: "2024-03-12" }}
      />,
    );
    const grid = screen.getAllByRole("grid")[0];
    await user.click(
      within(grid).getByRole("gridcell", { name: /March 20, 2024/i }),
    );
    expect(onChange).toHaveBeenLastCalledWith({ from: "2024-03-20", to: "" });
  });

  it("disables days before disabledBeforeDate", () => {
    render(
      <RangePicker
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

  it("Enter on a focused day selects it via keyboard", async () => {
    const onChange = vi.fn();
    render(
      <RangePicker
        onChange={onChange}
        autoResponsive={false}
        initialMonthAndYear="2024-03-01"
      />,
    );
    const day10 = within(screen.getAllByRole("grid")[0]).getByRole("gridcell", {
      name: /March 10, 2024/i,
    });
    day10.focus();
    const user = userEvent.setup();
    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenLastCalledWith({ from: "2024-03-10", to: "" });
  });
});
