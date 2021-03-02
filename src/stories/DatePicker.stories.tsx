import React from 'react';
import { storiesOf } from '@storybook/react';

import { DatePicker } from '../datePicker';

storiesOf('Date Picker Component', module).add('Sample', () => {
  return (
    <div>
      <DatePicker jalali={false} numberOfMonths={2} />
    </div>
  );
});
