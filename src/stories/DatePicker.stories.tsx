import type { Meta, StoryObj } from "@storybook/react";

import { FORMAT_DATE } from "../constant";
import { DatePicker } from "../datePicker";
import { dayjs } from "../libs/dayjs-config";

const today = dayjs();

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Accessible, fully customizable date picker. Supports Gregorian and Jalali calendars, multi-month layouts, controlled/uncontrolled selection, and full keyboard navigation.",
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
      description: "Day.js locale used for month and weekday names.",
    },
    numberOfMonths: {
      control: { type: "number", min: 1, max: 4 },
      description: "How many months to render side-by-side.",
    },
    numberOfSelectableDays: {
      control: { type: "number", min: 0, max: 10 },
      description:
        "Cap the number of days that can be selected at once. 0 = unlimited, 1 = single-date mode.",
    },
    startOfWeek: {
      control: { type: "number", min: 0, max: 6 },
      description:
        "First column of the calendar. 0 = Sunday, 1 = Monday, etc. Ignored when `jalali` is true.",
    },
    autoResponsive: {
      control: "boolean",
      description:
        "Automatically grow/shrink the number of visible months based on container width.",
    },
    disabled: { control: "boolean", description: "Disable the entire picker." },
    disabledBeforeToday: {
      control: "boolean",
      description: "Disable any date strictly before today.",
    },
    disabledBeforeDate: {
      control: "text",
      description: "Disable any date strictly before this `YYYY-MM-DD`.",
    },
    disabledAfterDate: {
      control: "text",
      description: "Disable any date strictly after this `YYYY-MM-DD`.",
    },
    onChange: { action: "change" },
    onRangeDateInScreen: { action: "rangeDateInScreen" },
  },
  args: {
    jalali: false,
    locale: "en",
    numberOfMonths: 1,
    numberOfSelectableDays: 0,
    startOfWeek: 1,
    autoResponsive: true,
    disabled: false,
    disabledBeforeToday: false,
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};

export const Jalali: Story = {
  args: { jalali: true },
};

export const MultipleMonths: Story = {
  args: { numberOfMonths: 2, autoResponsive: false },
};

export const DisabledBeforeToday: Story = {
  args: { disabledBeforeToday: true, numberOfMonths: 2, autoResponsive: false },
};

export const DisabledRange: Story = {
  args: {
    disabledBeforeDate: today.subtract(2, "day").format(FORMAT_DATE),
    disabledAfterDate: today.add(21, "day").format(FORMAT_DATE),
    numberOfMonths: 2,
    autoResponsive: false,
  },
};

export const DisabledDays: Story = {
  args: {
    disabledDays: [
      today.add(3, "day").format(FORMAT_DATE),
      today.add(9, "day").format(FORMAT_DATE),
      today.add(10, "day").format(FORMAT_DATE),
    ],
    numberOfMonths: 2,
    autoResponsive: false,
  },
};

export const PreselectedDays: Story = {
  args: {
    selectedDays: [
      today.add(2, "day").format(FORMAT_DATE),
      today.add(6, "day").format(FORMAT_DATE),
      today.add(15, "day").format(FORMAT_DATE),
    ],
    numberOfMonths: 2,
    autoResponsive: false,
  },
};

export const SingleDateMode: Story = {
  args: { numberOfSelectableDays: 1 },
};

export const NumberOfSelectableDays: Story = {
  args: { numberOfSelectableDays: 3, numberOfMonths: 2, autoResponsive: false },
};

export const DisabledCalendar: Story = {
  args: { disabled: true },
};

export const CustomDayClasses: Story = {
  args: {
    autoResponsive: false,
    numberOfMonths: 1,
    dayClasses: day => [
      Number(day.format("D")) % 2 === 1 ? "tp-odd" : "tp-even",
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Apply custom CSS classes per day via the `dayClasses` callback. Combine with your own stylesheet to highlight weekends, holidays, etc.",
      },
    },
  },
};

export const CustomTheme: Story = {
  args: {
    theme: {
      primary: { light: "#ffd4e5", main: "#e91e63", dark: "#ad1457" },
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
        <div style={{ color: "#e91e63", fontWeight: 600 }}>
          {dayjs(day).format("D")}
        </div>
      ),
    },
  },
};

export const CustomWeekdayTitles: Story = {
  args: {
    components: {
      titleOfWeek: { titles: ["1", "2", "3", "4", "5", "6", "7"] },
    },
  },
};

export const CustomHeaderIcons: Story = {
  args: {
    components: {
      header: {
        monthIcons: {
          right: <span aria-hidden>→</span>,
          left: <span aria-hidden>←</span>,
        },
        yearIcons: {
          right: <span aria-hidden>»</span>,
          left: <span aria-hidden>«</span>,
        },
      },
    },
  },
};
