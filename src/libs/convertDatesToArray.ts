import { Dayjs } from "dayjs";

import { dayjs } from "./dayjs-config";

export const convertDatesToArray = (dates: string[], jalali: boolean) => {
  return dates.map(item =>
    (dayjs(item, { jalali: !jalali } as any) as Dayjs).calendar(
      jalali ? "jalali" : "gregory",
    ),
  );
};
