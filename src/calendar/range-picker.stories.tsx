import * as React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { boolean, text, array, number } from '@storybook/addon-knobs';
import RangePicker from './range-picker';

let disabledDays = [
  '2019-12-02',
  '2019-11-12',
  '2019-10-22',
  '2019-11-04',
  '2020-01-04',
  '2020-02-14',
  '2020-03-24',
  '2020-04-24',
];

export const responsiveChecking = setMultiMonths => {
  let width = document.querySelector('.tp-calendar').clientWidth;
  if (width > 900) {
    setMultiMonths(3);
  } else if (width < 900 && width > 580) {
    setMultiMonths(2);
  } else if (width < 580) {
    setMultiMonths(1);
  }
};

export const Day: React.FC<{ day: any }> = ({ day }) => {
  return (
    <>
      <p className="date">{day.format('DD')}</p>
      <p className="date">7</p>
    </>
  );
};

const stories = storiesOf('Range picker', module);

stories
  .add('simple', () => <RangePicker handleChange={handleChange} />)
  .add('selected days', () => (
    <RangePicker
      handleChange={handleChange}
      selectedDays={{
        from: text('fromDay', '2020-04-02'),
        to: text('toDay', '2020-06-02'),
      }}
    />
  ))
  .add('jalali', () => (
    <RangePicker handleChange={handleChange} jalali={boolean('jalali', true)} />
  ))
  .add('number of months', () => (
    <RangePicker
      handleChange={handleChange}
      numberOfMonths={number('number of month', 3)}
    />
  ))
  .add('disabled days', () => (
    <RangePicker
      handleChange={handleChange}
      disabledDays={array('disabled dates', disabledDays)}
    />
  ))
  .add('responsive', () => (
    <RangePicker handleChange={handleChange} responsive={responsiveChecking} />
  ))
  .add('hoverable', () => (
    <RangePicker
      handleChange={handleChange}
      hoverable={boolean('hoverable', false)}
    />
  ))
  .add('disabled before today', () => (
    <RangePicker
      handleChange={handleChange}
      disabledBeforToday={boolean('disabledBeforToday', false)}
    />
  ))
  .add('custom day component', () => (
    <RangePicker handleChange={handleChange} dayComponent={Day} />
  ))
  .add('custom title weeks component', () => (
    <RangePicker
      handleChange={handleChange}
      titleComponent={Title}
      numberOfMonths={number('number of month', 3)}
    />
  ))
  .add('all props', () => (
    <RangePicker
      handleChange={handleChange}
      selectedDays={{
        from: text('fromDay', ''),
        to: text('toDay', ''),
      }}
      jalali={boolean('jalali', false)}
      numberOfMonths={number('number of month', 3)}
      disabledDays={array('disabled dates', disabledDays)}
      responsive={responsiveChecking}
      hoverable={boolean('hoverable', true)}
      dayComponent={Day}
      disabledBeforToday={boolean('disabledBeforToday', true)}
      titleComponent={Title}
    />
  ));

const handleChange = days => {
  console.log('online days', days);
  return true;
};

const Title: React.FunctionComponent<{ source: any }> = ({ source }) => {
  let titleDay = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  // you can just change titles, not day start of the week
  return (
    <TitleDaysOfWeekStyle>
      {titleDay.map(item => (
        <p key={Math.random()}>{item}</p>
      ))}
    </TitleDaysOfWeekStyle>
  );
};

export const TitleDaysOfWeekStyle = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: row-reverse;
  border-bottom: 1px solid #e2e2e2;
  margin: 30px 0 15px 0;
  font-size: 12px;

  p {
    width: 40px;
    margin-bottom: 15px;
  }
`;
