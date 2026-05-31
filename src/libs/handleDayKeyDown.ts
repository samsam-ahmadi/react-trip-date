import { Dayjs } from "dayjs";
import { KeyboardEvent } from "react";

type Options = {
  day: Dayjs;
  source: Dayjs;
  setSource: (next: Dayjs) => void;
  setFocusedDate: (date: string) => void;
  requestFocus?: (date: string) => void;
};

const FMT = "YYYY-MM-DD";

export function handleDayKeyDown(
  event: KeyboardEvent<HTMLElement>,
  { day, source, setSource, setFocusedDate, requestFocus }: Options,
): boolean {
  let next: Dayjs | undefined;

  switch (event.key) {
    case "ArrowLeft":
      next = day.subtract(1, "day");
      break;
    case "ArrowRight":
      next = day.add(1, "day");
      break;
    case "ArrowUp":
      next = day.subtract(1, "week");
      break;
    case "ArrowDown":
      next = day.add(1, "week");
      break;
    case "Home":
      next = day.startOf("week");
      break;
    case "End":
      next = day.endOf("week");
      break;
    case "PageUp":
      next = event.shiftKey
        ? day.subtract(1, "year")
        : day.subtract(1, "month");
      break;
    case "PageDown":
      next = event.shiftKey ? day.add(1, "year") : day.add(1, "month");
      break;
    default:
      return false;
  }

  event.preventDefault();
  event.stopPropagation();

  const nextStr = next.format(FMT);
  requestFocus?.(nextStr);
  setFocusedDate(nextStr);

  if (next.month() !== source.month() || next.year() !== source.year()) {
    setSource(next.startOf("month"));
  }

  return true;
}
