import { Dayjs } from 'dayjs';

import { _dayjs } from './dayjs-config';

export const convertDatesToArray = (dates: string[], jalali: boolean) => {
  return dates.map(item =>
    (_dayjs(item, { jalali: !jalali } as any) as Dayjs).calendar(
      jalali ? 'jalali' : 'gregory',
    ),
  );
};
