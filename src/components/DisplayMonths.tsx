import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

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
  const selectMonth = (next: Dayjs) => {
    setSource(next.month(+next.format("M") - 1));
    setDisplayMonths(false);
  };

  // Anchor the day at 1 before changing month — otherwise dayjs rolls a
  // day-of-month like 31 into the next month when the target month is
  // shorter, producing duplicates / skips when the source falls late in
  // its month.
  const firstOfMonth = source.date(1);
  const months: Dayjs[] = [];
  for (let i = 0; i < 12; i++) {
    months[i] = firstOfMonth.month(i);
  }

  return (
    <Wrapper
      className="tp-calendar-month-select"
      $jalali={jalali}
      role="listbox"
      aria-label="Choose month"
    >
      {months.map((item, index) => (
        <div
          key={index}
          onClick={() => selectMonth(item)}
          onKeyDown={event => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              selectMonth(item);
            }
          }}
          role="option"
          aria-selected={source.month() === item.month()}
          tabIndex={0}
          data-testid="month-item-to-select"
        >
          <p>{item.format("MMMM")}</p>
        </div>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $jalali: boolean }>`
  margin-top: 15px;
  display: flex;
  flex: 1 1;
  height: 350px;
  flex-wrap: wrap;
  flex-direction: ${({ $jalali }) => ($jalali ? "row-reverse" : "row")};
  > div {
    flex-basis: calc(25% - 4px);
    justify-content: center;
    text-align: center;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 2px solid #fff;
    background-color: ${({ theme }) => theme.primary.main};
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.primary.dark};
      outline-offset: 2px;
    }

    p {
      color: #fff;
    }
  }
`;
