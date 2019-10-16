import * as React from 'react';
import Calendar from '../calendar';
import Box from '../../layouts/box';
import { TitleOfWeek } from '../component/TitleOfWeek';
import { Day } from './Day';
import { MonthsStyle } from '../index.styles';
import Context from '../context/Context';

export const Month = () => {
  let { source, jalali, numberOfMonths, TitleComponent } = React.useContext(
    Context,
  );

  let months = [];
  for (let i = 0; i < numberOfMonths; i++) {
    if (source.get('day') === 0) {
      source = source.add(1, 'day');
    }
    months.push(
      <div className="month date-picker" key={i}>
        {TitleComponent ? (
          <TitleComponent source={source} />
        ) : (
          <TitleOfWeek jalali={jalali} />
        )}
        <Calendar source={source.subtract(-i, 'month')} jalali={jalali}>
          {calendar => (
            <Box column>
              {calendar.map(week => (
                <Box className="week" key={Math.random()}>
                  {week.map(day => {
                    return <Day key={Math.random()} day={day} month={i} />;
                  })}
                </Box>
              ))}
            </Box>
          )}
        </Calendar>
      </div>,
    );
  }

  return (
    <MonthsStyle numberOfMonths={numberOfMonths || 1} jalali={jalali}>
      {months}
    </MonthsStyle>
  );
};
