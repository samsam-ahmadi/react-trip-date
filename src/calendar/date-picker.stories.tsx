import * as React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { boolean, array, number } from '@storybook/addon-knobs';
import DatePicker from './date-picker';
import { Day } from './range-picker.stories';

const stories = storiesOf('Date picker', module);

let selectedDays = ['2019-10-01', '2019-11-06'];
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

export const responsiveChecking = setNumberOfMonth => {
  let width = document.querySelector('.tp-calendar').clientWidth;
  if (width > 900) {
    setNumberOfMonth(3);
  } else if (width < 900 && width > 580) {
    setNumberOfMonth(2);
  } else if (width < 580) {
    setNumberOfMonth(1);
  }
};

stories
  .add('simple', () => <DatePicker handleChange={handleChange} />)
  .add('selected days', () => (
    <DatePicker
      handleChange={handleChange}
      selectedDays={array('selected days', selectedDays)}
    />
  ))
  .add('jalali', () => (
    <DatePicker handleChange={handleChange} jalali={boolean('Jalali', true)} />
  ))
  .add('number of months', () => (
    <DatePicker
      handleChange={handleChange}
      numberOfMonths={number('number of month', 3)}
    />
  ))
  .add('number of selectable days', () => (
    <DatePicker
      handleChange={handleChange}
      numberOfSelectableDays={number('how many day you want?', 3)}
    />
  ))
  .add('responsive', () => (
    <DatePicker handleChange={handleChange} responsive={responsiveChecking} />
  ))
  .add('disabled days', () => (
    <DatePicker
      handleChange={handleChange}
      disabledDays={array('disabled days', disabledDays)}
    />
  ))
  .add('disabled before today', () => (
    <DatePicker
      handleChange={handleChange}
      disabledBeforToday={boolean('disabledBeforToday', true)}
    />
  ))
  .add('disabled', () => (
    <DatePicker
      handleChange={handleChange}
      disabled={boolean('disabled', true)}
    />
  ))
  .add('custom day component', () => (
    <DatePicker handleChange={handleChange} dayComponent={Day} />
  ))
  .add('custom title weeks component', () => (
    <DatePicker handleChange={handleChange} titleComponent={Title} />
  ))
  .add('all props', () => (
    <DatePicker
      handleChange={handleChange}
      selectedDays={array('selected days', selectedDays)}
      jalali={boolean('Jalali', false)}
      numberOfMonths={number('number of month', 3)}
      numberOfSelectableDays={number('how many day you want?', 3)}
      disabledDays={array('disabled days', disabledDays)}
      responsive={responsiveChecking}
      disabledBeforToday={boolean('disabledBeforToday', true)}
      disabled={boolean('disabled', true)}
      dayComponent={Day}
      titleComponent={Title}
    />
  ));

const handleChange = days => {
  console.log('days', days);
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
    padding: 10px;
  }
`;
