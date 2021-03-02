import styled from 'styled-components';
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
  source: Dayjs;
  jalali: boolean;
  setSource: Dispatch<SetStateAction<Dayjs>>;
  setDisplayMonths: Dispatch<SetStateAction<boolean>>;
};

export const DisplayMonths = ({
  source,
  setSource,
  setDisplayMonths,
  jalali,
}: Props) => {
  const [months, setMonths] = useState<Dayjs[]>([]);

  useEffect(() => {
    let months = [];
    for (let i = 0; i < 12; i++) {
      months[i] = source.month(i);
    }
    setMonths(months);
  }, [jalali, source]);

  const selectMonth = (source: Dayjs) => {
    setSource(source.month(+source.subtract(1, 'month').format('M')));
    setDisplayMonths(false);
  };

  return (
    <Wrapper jalali={jalali}>
      {months.map(item => {
        return (
          <div key={item.format('MMMM')} onClick={() => selectMonth(item)}>
            <p>{item.format('MMMM')}</p>
          </div>
        );
      })}
    </Wrapper>
  );
};

type StyleProps = {
  jalali: boolean;
};

const Wrapper = styled.div<StyleProps>`
  margin-top: 15px;
  display: flex;
  flex: 1 1;
  height: 350px;
  flex-wrap: wrap;
  flex-direction: ${({ jalali }: StyleProps) =>
    jalali ? 'row-reverse' : 'row'};
  > div {
    flex-basis: calc(25% - 4px);
    justify-content: center;
    text-align: center;
    display: flex;
    background-color: ${({ theme }) => theme.primary.main};
    align-items: center;
    cursor: pointer;
    border: 2px solid #fff;
    p {
      color: #fff;
    }
  }
`;
