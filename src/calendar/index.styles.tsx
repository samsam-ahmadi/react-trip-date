import styled from 'styled-components';

export interface Props {
  numberOfMonths?: number;
  jalali?: boolean;
  className?: string;
}

export const DayStyle = styled.div`
  width: 40px;
  height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s ease-in-out;
  margin-bottom: 5px;
  flex-direction: column;
  cursor: pointer;

  p {
    margin: 0;
  }

  .price {
    font-size: 0.42rem;
  }

  .date {
    font-size: ${props => props.theme.fs11};
  }

  &.inactive {
    color: transparent;
    visibility: hidden;
  }

  &.disabled {
    color: ${props => props.theme.disabledText};
    position: relative;

    &:hover {
      cursor: not-allowed;
    }

    &::after {
      position: absolute;
      content: '';
      width: 15px;
      height: 2px;
      background-color: ${props => props.theme.disabledText};
      transform: rotate(-20deg);
    }
  }

  &.range-select {
    background-color: ${props => props.theme.primary};
    color: #fff;

    filter: drop-shadow(4px 0px 2px rgba(0, 0, 0, 0.1))
      drop-shadow(4px 0px 2px rgba(0, 0, 0, 0.1));

    &.jalali {
      filter: drop-shadow(-4px 0px 2px rgba(0, 0, 0, 0.1))
        drop-shadow(-4px 0px 2px rgba(0, 0, 0, 0.1));
    }

    &.end-date {
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;

      &.jalali {
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
      }
    }

    &.start-date {
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;

      &.jalali {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
      }
    }
  }

  &.select-mode {
    border-radius: 50%;
    margin-left: 5px;
    margin-bottom: 5px;
    width: 38px;
    height: 38px;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: ${props => props.theme.underlineColor};
    }
  }

  &.selected {
    color: #fff;
    background-color: ${props => props.theme.primary};
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: ${props => props.theme.primary};
    }

    p {
      color: #fff;
    }

    &::after {
      display: none;
    }
  }
  &.same {
    border-top-left-radius: 25px !important;
    border-bottom-left-radius: 25px !important;
    border-top-right-radius: 25px !important;
    border-bottom-right-radius: 25px !important;
  }
`;

export const HeaderStyle = styled.div<Props>`
  display: flex;
  flex-direction: ${(props: Props) => (props.jalali ? 'row-reverse' : 'row')};
  justify-content: space-between;
  align-items: center;
  height: 55px;
  background-color: ${props => props.theme.primary};
  position: relative;

  p {
    direction: ${props => (props.jalali ? 'ltr' : 'rtl')};
    font-size: ${props => props.theme.fs13};
    color: #fff;
    width: ${props => `${100 / props.numberOfMonths}%`};
    text-align: center;
    cursor: pointer;
  }
  .action {
    height: 55px;
    width: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transform: ${props => (props.jalali ? 'rotate(0deg)' : 'rotate(180deg)')};
  }

  path {
    fill: #fff;
  }
`;

export const TitleDaysOfWeekStyle = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: ${(props: Props) => (props.jalali ? 'row-reverse' : 'row')};
  border-bottom: 1px solid #e2e2e2;
  margin: 30px 0 15px 0;

  p {
    width: 40px;
    margin-bottom: 15px;
  }
`;

export const MonthsStyle = styled.div<Props>`
  display: flex;
  flex-direction: ${(props: Props) => (props.jalali ? 'row-reverse' : 'row')};
  justify-content: center;
  margin: 0 15px;
  .month {
    width: ${(props: Props) => `${100 / props.numberOfMonths}%`};
    margin: 0 15px;
  }

  .week {
    display: flex;
    flex-direction: ${(props: Props) => (props.jalali ? 'row-reverse' : 'row')};
    justify-content: center;
  }
`;
export const DisplayMonthStyle = styled.div<Props>`
  margin-top: 15px;
  display: flex;
  flex: 1 1;
  height: 350px;
  flex-wrap: wrap;
  flex-direction: ${(props: Props) => (props.jalali ? 'row-reverse' : 'row')};

  .month {
    flex-basis: calc(25% - 4px);
    justify-content: center;
    text-align: center;
    display: flex;
    background-color: ${props => props.theme.primary};
    align-items: center;
    cursor: pointer;
    border: 2px solid #fff;

    p {
      color: #fff;
    }
  }
`;
