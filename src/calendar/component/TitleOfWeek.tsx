import * as React from 'react';

import { TitleDaysOfWeekStyle } from '../index.styles';
import { TitleOfWeekProps } from '../typing';

export const TitleOfWeek: React.FunctionComponent<TitleOfWeekProps> = ({
  jalali,
}) => {
  let titleDayFa = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  let titleDayEn = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  let title = jalali ? titleDayFa : titleDayEn;
  return (
    <TitleDaysOfWeekStyle jalali={jalali} className="title-weeks">
      {title.map((item, index) => (
        <p key={`title-days-of-weeks${index}`}>{item}</p>
      ))}
    </TitleDaysOfWeekStyle>
  );
};
