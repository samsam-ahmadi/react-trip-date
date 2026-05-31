import type { Meta, StoryObj } from "@storybook/react";

import { FORMAT_DATE } from "../constant";
import { dayjs } from "../libs/dayjs-config";
import { RangePicker } from "../rangePicker";

const today = dayjs();

const meta: Meta<typeof RangePicker> = {
  title: "Components/RangePicker",
  component: RangePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Two-step date range picker. Click a start date, then an end date. Supports Gregorian/Jalali, multi-month layouts, disabled spans, and custom rendering.",
      },
    },
  },
  argTypes: {
    jalali: {
      control: "boolean",
      description:
        "Render the calendar in the Jalali (Persian) calendar system.",
    },
    locale: {
      control: "select",
      options: ["en", "de", "es", "fa", "fr", "it", "ja", "zh", "ru", "tr"],
    },
    numberOfMonths: { control: { type: "number", min: 1, max: 4 } },
    startOfWeek: { control: { type: "number", min: 0, max: 6 } },
    autoResponsive: { control: "boolean" },
    disabled: { control: "boolean" },
    disabledBeforeToday: { control: "boolean" },
    disabledBeforeDate: { control: "text" },
    disabledAfterDate: { control: "text" },
    allowDisabledDaysSpan: {
      control: "boolean",
      description:
        "When false (default), selecting an end date past a disabled day clamps the range. When true, the range can span over disabled days.",
    },
    onChange: { action: "change" },
    onRangeDateInScreen: { action: "rangeDateInScreen" },
  },
  args: {
    jalali: false,
    locale: "en",
    numberOfMonths: 2,
    startOfWeek: 1,
    autoResponsive: false,
    disabled: false,
    disabledBeforeToday: false,
    allowDisabledDaysSpan: false,
  },
};

export default meta;
type Story = StoryObj<typeof RangePicker>;

export const Default: Story = {};

export const Jalali: Story = {
  args: { jalali: true },
};

export const Preselected: Story = {
  args: {
    selectedDays: {
      from: today.add(2, "day").format(FORMAT_DATE),
      to: today.add(20, "day").format(FORMAT_DATE),
    },
  },
};

export const DisabledBeforeToday: Story = {
  args: { disabledBeforeToday: true },
};

export const DisabledRange: Story = {
  args: {
    disabledBeforeDate: today.subtract(2, "day").format(FORMAT_DATE),
    disabledAfterDate: today.add(21, "day").format(FORMAT_DATE),
  },
};

export const DisabledDays: Story = {
  args: {
    disabledDays: [
      today.add(3, "day").format(FORMAT_DATE),
      today.add(9, "day").format(FORMAT_DATE),
      today.add(10, "day").format(FORMAT_DATE),
    ],
  },
};

export const AllowDisabledDaysSpan: Story = {
  args: {
    allowDisabledDaysSpan: true,
    disabledDays: [
      today.add(4, "day").format(FORMAT_DATE),
      today.add(5, "day").format(FORMAT_DATE),
      today.add(6, "day").format(FORMAT_DATE),
    ],
    numberOfMonths: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When enabled, the user can select a range that includes disabled days. Useful for booking flows where the user can preview pricing across blocked dates.",
      },
    },
  },
};

export const DisabledCalendar: Story = {
  args: { disabled: true },
};

export const CustomTheme: Story = {
  args: {
    theme: {
      primary: { light: "#d4e8ff", main: "#3f50b5", dark: "#002884" },
      grey: { 700: "#707070", 900: "#1b1b1d" },
      background: { default: "#fff" },
      text: { disabled: "#bababa" },
      shape: { borderRadius: 8 },
    },
  },
};

export const CustomDayComponent: Story = {
  args: {
    components: {
      days: ({ day }) => (
        <div style={{ color: "#3f50b5", fontWeight: 600 }}>
          {dayjs(day).format("D")}
        </div>
      ),
    },
  },
};
