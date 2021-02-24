import React from 'react';
import styled from 'styled-components';

import { ReactComponent as ArrowLeft } from '../assets/chevron-left.svg';
import { ReactComponent as ArrowRight } from '../assets/chevron-right.svg';

type Props = {
  displayMonths: boolean;
};

export const Header = ({ displayMonths }: Props) => {
  const prevMonth = () => {};
  const nextMonth = () => {};
  return (
    <Wrapper jalali={true}>
      <div className="action" onClick={prevMonth}>
        <ArrowRight />
        {displayMonths ? <ArrowRight /> : null}
      </div>
      <div className="action" onClick={nextMonth}>
        <ArrowLeft />
        {displayMonths ? <ArrowLeft className={'next-month'} /> : null}
      </div>
    </Wrapper>
  );
};

type WrapperProps = {
  jalali: boolean;
};

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  position: relative;
  background-color: ${({ theme }) => theme.primary.main};
  flex-direction: ${({ jalali }) => (jalali ? 'row-reverse' : 'row')};
  .action svg {
    width: 30px;
    height: 15px;
    color: ${({ theme }) => theme.background.default};
  }
`;
