import type { Meta, StoryObj } from "@storybook/react";
import styled from "styled-components";

import { Calendar } from "../calendar";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Headless calendar primitive. Yields a `Dayjs[][]` (weeks of days) to a render-prop child so you can build a fully custom UI.",
      },
    },
  },
  argTypes: {
    jalali: { control: "boolean" },
    startOfWeek: { control: { type: "number", min: 0, max: 6 } },
  },
  args: {
    jalali: false,
    startOfWeek: 1,
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const Day = styled.span`
  display: inline-block;
  margin: 4px 6px;
  font-variant-numeric: tabular-nums;
`;

const Row = styled.div`
  display: flex;
  gap: 4px;
`;

export const RenderProp: Story = {
  render: args => (
    <Calendar {...args}>
      {month =>
        month.map(week => (
          <Row key={week[0].format("YYYY-MM-DD")}>
            {week.map(day => (
              <Day key={day.format("YYYY-MM-DD")}>{day.format("DD")}</Day>
            ))}
          </Row>
        ))
      }
    </Calendar>
  ),
};

export const Jalali: Story = {
  args: { jalali: true },
  render: RenderProp.render,
};
