import styled from "styled-components";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import { InitialComponents } from "constant";

import { ReactComponent as ArrowLeft } from "../assets/chevron-left.svg";
import { ReactComponent as ArrowRight } from "../assets/chevron-right.svg";
import { DisplayYears } from "./DisplayYears";

type Props = {
  displayMonths: boolean;
  jalali: boolean;
  numberOfMonths: number;
  source: Dayjs;
  components?: InitialComponents;
  setDisplayMonths: Dispatch<SetStateAction<boolean>>;
  setSource: Dispatch<SetStateAction<Dayjs>>;
};

export const Header = ({
  jalali,
  source,
  setSource,
  components,
  displayMonths,
  numberOfMonths,
  setDisplayMonths,
}: Props) => {
  const [displayYears, setDisplayYears] = useState(false);

  const prev = () => {
    if (displayMonths) {
      setSource(source.subtract(1, "year"));
    } else {
      setSource(source.subtract(1, "month"));
    }
  };

  const next = () => {
    if (displayMonths) {
      setSource(source.add(1, "year"));
    } else {
      setSource(source.add(1, "month"));
    }
  };

  const renderTitles = () => {
    let titles = [];

    if (displayMonths) {
      return (
        <>
          <p
            onClick={() =>
              displayMonths
                ? setDisplayYears(prev => !prev)
                : setDisplayMonths(prev => !prev)
            }
          >
            {source.format(
              components?.header?.format
                ? components?.header?.format
                : displayMonths
                ? "YYYY"
                : "YYYY-MMMM",
            )}
          </p>
          {displayYears && (
            <DisplayYears
              setDisplayYears={setDisplayYears}
              setSource={setSource}
            />
          )}
        </>
      );
    }

    for (let i = 0; i < numberOfMonths; i++) {
      if (source.get("day") === 0) {
        source = source.add(1, "day");
      }
      titles.push(
        <p key={i} onClick={() => setDisplayMonths(prev => !prev)}>
          {source
            .add(i, "month")
            .format(
              components?.header?.format
                ? components?.header?.format
                : "YYYY MMMM",
            )}
        </p>,
      );
    }
    return titles;
  };

  return (
    <Wrapper
      className="tp-calendar-header"
      numberOfMonths={numberOfMonths}
      jalali={jalali}
      displayMonths={displayMonths}
    >
      <div
        className={components?.header?.monthIcons?.left ? "" : "action left"}
        onClick={prev}
      >
        {/* Display month icons */}
        {components?.header?.monthIcons?.left &&
          !displayMonths &&
          components.header.monthIcons.left}

        {/* Display Year icons */}
        {components?.header?.yearIcons?.left &&
          displayMonths &&
          components.header.yearIcons.left}

        {/* Display default icons */}
        {!components?.header?.monthIcons?.left && (
          <>
            <ArrowLeft />
            {displayMonths ? <ArrowLeft /> : null}
          </>
        )}
      </div>
      {renderTitles()}
      <div
        className={components?.header?.monthIcons?.right ? "" : "action right"}
        onClick={next}
      >
        {/* Display month icons */}
        {components?.header?.monthIcons?.right &&
          !displayMonths &&
          components.header.monthIcons.right}

        {/* Display Year icons */}
        {components?.header?.yearIcons?.right &&
          displayMonths &&
          components.header.yearIcons.right}

        {/* Display default icons */}
        {!components?.header?.monthIcons?.right && (
          <>
            <ArrowRight />
            {displayMonths ? <ArrowRight /> : null}
          </>
        )}
      </div>
    </Wrapper>
  );
};

type WrapperProps = {
  jalali: boolean;
  numberOfMonths: number;
  displayMonths: boolean;
};

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  position: relative;
  background-color: ${({ theme }) => theme.primary.main};
  flex-direction: ${({ jalali }) => (jalali ? "row-reverse" : "row")};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  p {
    color: #fff;
    text-align: center;
    cursor: pointer;
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
    direction: ${({ jalali }) => (jalali ? "ltr" : "rtl")};
    width: ${({ numberOfMonths, displayMonths }) =>
      displayMonths ? "120px" : `${100 / numberOfMonths}% `};
    margin: auto;
  }
  .action {
    position: absolute;
    height: 55px;
    width: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &.right {
      transform: ${({ jalali }) =>
        !jalali ? "rotate(0deg)" : "rotate(180deg)"};
      ${({ jalali }) => (jalali ? "left:0;" : "right: 0;")}
    }
    &.left {
      transform: ${({ jalali }) =>
        !jalali ? "rotate(0deg)" : "rotate(180deg)"};
      ${({ jalali }) => (jalali ? "right:0;" : "left: 0;")}
    }
  }
  svg {
    width: 10px;
    height: 15px;
    color: ${({ theme }) => theme.background.default};
  }
`;
