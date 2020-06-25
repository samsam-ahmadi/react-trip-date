import React from 'react';
import styled from 'styled-components';
import { Calendar } from 'calendar';
import { storiesOf } from '@storybook/react';

storiesOf('Calendar Component', module).add('Sample', () => {
  return (
    <div>
      <Calendar jalali={false}>
        {month => {
          return month.map(week => (
            <div key={Math.random()}>
              {week.map(day => (
                <Day key={Math.random()}>{day.format('MM-DD-dddd')}</Day>
              ))}
            </div>
          ));
        }}
      </Calendar>
    </div>
  );
});

const Day = styled.p`
  margin: 5px;
  display: inline-block;
`;
