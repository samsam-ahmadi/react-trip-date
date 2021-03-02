import styled from 'styled-components';

type WrapperProps = {
  jalali: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  flex-direction: ${({ jalali }) => (jalali ? 'row-reverse' : 'row')};
`;

type MonthProps = {
  numberOfMonths: number;
};

export const Month = styled.div<MonthProps>`
  height: 350px;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  width: ${({ numberOfMonths }) => `${100 / numberOfMonths}%`};
`;

type WeeksProps = {
  jalali: boolean;
};
export const Weeks = styled.div<WeeksProps>`
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: ${({ jalali }) => (jalali ? 'row-reverse' : 'row')};
`;
