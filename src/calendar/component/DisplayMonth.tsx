import * as React from 'react';

import { DisplayMonthStyle } from '../index.styles';
import Context from '../context/Context';

const DisplayMonth = () => {
  const { source, setSource, setDisplayMonths, jalali } = React.useContext(
    Context,
  );
  const [months, setMonths] = React.useState([]);
  React.useEffect(() => {
    let months = [];
    for (let i = 0; i < 12; i++) {
      months[i] = source.month(i);
    }
    setMonths(months);
  }, [jalali, source]);

  const updateMonth = source => {
    if (source.get('day') === 0) {
      source = source.add(1, 'day');
    }
    setSource(source.month(+source.subtract(1, 'month').format('M')));
    setDisplayMonths(false);
  };
  return (
    <DisplayMonthStyle jalali={jalali} className="months">
      {months.map(item => {
        return (
          <div
            className="month"
            key={item.format('MMMM')}
            onClick={() => updateMonth(item)}
          >
            <p>{item.format('MMMM')}</p>
          </div>
        );
      })}
    </DisplayMonthStyle>
  );
};

export default DisplayMonth;
