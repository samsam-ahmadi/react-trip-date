import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

import { DisplayYears } from "./DisplayYears";
import ArrowLeft from "../assets/chevron-left.svg?react";
import ArrowRight from "../assets/chevron-right.svg?react";
import { InitialComponents } from "../constant";

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
    setSource(source.subtract(1, displayMonths ? "year" : "month"));
  };

  const next = () => {
    setSource(source.add(1, displayMonths ? "year" : "month"));
  };

  const prevLabel = displayMonths
    ? `Previous year, ${source.format("YYYY")}`
    : `Previous month, ${source.format("MMMM YYYY")}`;
  const nextLabel = displayMonths
    ? `Next year, ${source.format("YYYY")}`
    : `Next month, ${source.format("MMMM YYYY")}`;

  const renderTitles = () => {
    if (displayMonths) {
      return (
        <>
          <button
            type="button"
            className="tp-calendar-header-title"
            onClick={() => setDisplayYears(open => !open)}
            aria-label={`Choose year, ${source.format("YYYY")}`}
          >
            {source.format(
              components?.header?.format ??
                (displayMonths ? "YYYY" : "YYYY-MMMM"),
            )}
          </button>
          {displayYears && (
            <DisplayYears
              setDisplayYears={setDisplayYears}
              setSource={setSource}
            />
          )}
        </>
      );
    }

    const titles = [];
    for (let i = 0; i < numberOfMonths; i++) {
      const monthSource = source.add(i, "month");
      titles.push(
        <button
          type="button"
          key={i}
          className="tp-calendar-header-title"
          onClick={() => setDisplayMonths(open => !open)}
          aria-label={`Choose month, ${monthSource.format("MMMM YYYY")}`}
        >
          {monthSource.format(components?.header?.format ?? "YYYY MMMM")}
        </button>,
      );
    }
    return titles;
  };

  return (
    <Wrapper
      className="tp-calendar-header"
      $numberOfMonths={numberOfMonths}
      $jalali={jalali}
      $displayMonths={displayMonths}
    >
      <button
        type="button"
        aria-label={prevLabel}
        className={components?.header?.monthIcons?.left ? "" : "action left"}
        onClick={prev}
      >
        {components?.header?.monthIcons?.left &&
          !displayMonths &&
          components.header.monthIcons.left}
        {components?.header?.yearIcons?.left &&
          displayMonths &&
          components.header.yearIcons.left}
        {!components?.header?.monthIcons?.left && (
          <>
            <ArrowLeft />
            {displayMonths ? <ArrowLeft /> : null}
          </>
        )}
      </button>
      {renderTitles()}
      <button
        type="button"
        aria-label={nextLabel}
        className={components?.header?.monthIcons?.right ? "" : "action right"}
        onClick={next}
      >
        {components?.header?.monthIcons?.right &&
          !displayMonths &&
          components.header.monthIcons.right}
        {components?.header?.yearIcons?.right &&
          displayMonths &&
          components.header.yearIcons.right}
        {!components?.header?.monthIcons?.right && (
          <>
            <ArrowRight />
            {displayMonths ? <ArrowRight /> : null}
          </>
        )}
      </button>
    </Wrapper>
  );
};

type WrapperProps = {
  $jalali: boolean;
  $numberOfMonths: number;
  $displayMonths: boolean;
};

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  position: relative;
  background-color: ${({ theme }) => theme.primary.main};
  flex-direction: ${({ $jalali }) => ($jalali ? "row-reverse" : "row")};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;

  .tp-calendar-header-title {
    color: #fff;
    text-align: center;
    cursor: pointer;
    border: 0;
    background: transparent;
    font: inherit;
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
    direction: ${({ $jalali }) => ($jalali ? "ltr" : "rtl")};
    width: ${({ $numberOfMonths, $displayMonths }) =>
      $displayMonths ? "120px" : `${100 / $numberOfMonths}% `};
    margin: auto;

    &:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 2px;
    }
  }

  button.action {
    position: absolute;
    height: 55px;
    width: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 0;
    background: transparent;
    color: #fff;

    &:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 2px;
    }

    &.right {
      transform: ${({ $jalali }) =>
        !$jalali ? "rotate(0deg)" : "rotate(180deg)"};
      ${({ $jalali }) => ($jalali ? "left:0;" : "right: 0;")}
    }
    &.left {
      transform: ${({ $jalali }) =>
        !$jalali ? "rotate(0deg)" : "rotate(180deg)"};
      ${({ $jalali }) => ($jalali ? "right:0;" : "left: 0;")}
    }
  }

  svg {
    width: 10px;
    height: 15px;
    color: ${({ theme }) => theme.background.default};
  }
`;
