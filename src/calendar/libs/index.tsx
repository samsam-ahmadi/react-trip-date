import dayjs from './dayjs';

export const convertDatesToArray = (selectedDate, toJalali) => {
  return selectedDate.map(item =>
    (dayjs(item, { jalali: !toJalali } as any) as any)
      .calendar(toJalali ? 'jalali' : 'gregory')
      .format('YYYY-MM-DD'),
  );
};