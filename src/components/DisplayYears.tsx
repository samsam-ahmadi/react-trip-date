import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import { useOnClickOutside } from "../libs/useClickOutside";

type Props = {
  setSource: Dispatch<SetStateAction<Dayjs>>;
  setDisplayYears: Dispatch<SetStateAction<boolean>>;
};

const YEAR_COUNT = 120;

export const DisplayYears = ({ setDisplayYears, setSource }: Props) => {
  const { ref } = useOnClickOutside<HTMLDivElement>(() =>
    setDisplayYears(false),
  );

  const years = [];
  for (let i = 0; i < YEAR_COUNT; i++) {
    const label = dayjs().subtract(i, "year").format("YYYY");
    years.push(
      <button
        type="button"
        key={label}
        onClick={() => {
          setSource(prev => prev.set("year", Number(label)));
          setDisplayYears(open => !open);
        }}
      >
        {label}
      </button>,
    );
  }

  return (
    <Wrapper
      className="tp-calendar-year-select"
      ref={ref}
      role="listbox"
      aria-label="Choose year"
    >
      {years}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  margin: auto;
  width: 80px;
  height: 40vh;
  background: #fff;
  overflow: auto;
  padding: 10px 0px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  z-index: 10;

  > button {
    display: block;
    margin: 0;
    padding: 6px 0;
    text-align: center;
    width: 100%;
    color: ${({ theme }) => theme.grey[900]};
    border: 0;
    background: transparent;
    font: inherit;
    cursor: pointer;

    &:hover,
    &:focus-visible {
      background-color: ${({ theme }) => theme.primary.light};
      outline: none;
    }
  }
`;
