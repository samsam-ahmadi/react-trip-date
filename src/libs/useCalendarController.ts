import { Dayjs } from "dayjs";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { dayjsLocalized } from "./dayjsLocalized";
import { getDayFormat } from "./getDayFormat";

const SINGLE_MONTH_BREAKPOINT = 580;
const MONTH_WIDTH = 320;

export type DateWindow = { start: string; end: string };

export interface UseCalendarControllerOptions {
  autoResponsive: boolean;
  initialMonthAndYear: string | undefined;
  jalali: boolean;
  locale: string | undefined;
  numberOfMonthsProp: number;
  onRangeDateInScreen?: (window: DateWindow) => void;
  initialFocusDate?: string;
}

export interface CalendarController {
  ref: RefObject<HTMLDivElement>;
  source: Dayjs;
  setSource: Dispatch<SetStateAction<Dayjs>>;
  numberOfMonths: number;
  displayMonths: boolean;
  setDisplayMonths: Dispatch<SetStateAction<boolean>>;
}

export function useCalendarController({
  autoResponsive,
  initialMonthAndYear,
  jalali,
  locale,
  numberOfMonthsProp,
  onRangeDateInScreen,
  initialFocusDate,
}: UseCalendarControllerOptions): CalendarController {
  const ref = useRef<HTMLDivElement>(null);

  const [source, setSource] = useState<Dayjs>(() =>
    dayjsLocalized(jalali, initialMonthAndYear ?? initialFocusDate, locale),
  );
  const [displayMonths, setDisplayMonths] = useState(false);
  const [numberOfMonths, setNumberOfMonths] = useState(numberOfMonthsProp);

  useEffect(() => {
    if (initialMonthAndYear) {
      setSource(dayjsLocalized(jalali, initialMonthAndYear, locale));
    }
  }, [initialMonthAndYear, jalali, locale]);

  useEffect(() => {
    if (!autoResponsive) {
      setNumberOfMonths(numberOfMonthsProp);
      return;
    }

    if (typeof window === "undefined") return;

    const element = ref.current;
    if (!element) return;

    const apply = (width: number) => {
      if (width < SINGLE_MONTH_BREAKPOINT) {
        setNumberOfMonths(1);
      } else {
        setNumberOfMonths(Math.max(1, Math.floor(width / MONTH_WIDTH)));
      }
    };

    apply(element.clientWidth);

    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        apply(entry.contentRect.width);
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [autoResponsive, numberOfMonthsProp]);

  const onRangeDateInScreenRef = useRef(onRangeDateInScreen);
  onRangeDateInScreenRef.current = onRangeDateInScreen;

  useEffect(() => {
    if (!onRangeDateInScreenRef.current) return;
    const months = Math.max(0, numberOfMonths - 1);
    let endDate = source.add(months, "month");
    endDate = endDate.date(endDate.daysInMonth());
    const startDate = source.date(1);
    onRangeDateInScreenRef.current({
      start: getDayFormat(startDate, jalali),
      end: getDayFormat(endDate, jalali),
    });
  }, [jalali, numberOfMonths, source]);

  return {
    ref,
    source,
    setSource,
    numberOfMonths,
    displayMonths,
    setDisplayMonths,
  };
}
