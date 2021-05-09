import styled from "styled-components";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";

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
  const selectMonth = (source: Dayjs) => {
    setSource(source.month(+source.format("M") - 1));
    setDisplayMonths(false);
  };

  const renderMonths = () => {
    let months = [];
    for (let i = 0; i < 12; i++) {
      months[i] = source.month(i);
    }
    return months.map(item => {
      return (
        <div
          key={item.format("MM-MMMM")}
          onClick={() => selectMonth(item)}
          data-testid="month-item-to-select"
        >
          <p>{item.format("MMMM")}</p>
        </div>
      );
    });
  };
  return <Wrapper jalali={jalali}>{renderMonths()}</Wrapper>;
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
    jalali ? "row-reverse" : "row"};
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
