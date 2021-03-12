import { dayjs } from "./dayjs-config";

export const convertDatesToArray = (dates: string[], jalali: boolean) => {
  return dates.map(item =>
    dayjs(item, { jalali: !jalali })
      .calendar(jalali ? "jalali" : "gregory")
      .format("YYYY-MM-DD"),
  );
};
