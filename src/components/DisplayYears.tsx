import styled from "styled-components";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { useOnClickOutside } from "libs/useClickOutside";

type Props = {
  setSource: Dispatch<SetStateAction<Dayjs>>;
  setDisplayYears: Dispatch<SetStateAction<boolean>>;
};

export const DisplayYears = ({ setDisplayYears, setSource }: Props) => {
  const years = [];
  const { ref } = useOnClickOutside(() => setDisplayYears(prev => !prev));
  for (let i = 0; i < 120; i++) {
    years.push(
      <p
        key={i}
        onClick={() => {
          setSource(pre =>
            pre.set("year", Number(dayjs().subtract(i, "year").format("YYYY"))),
          );
          setDisplayYears(prev => !prev);
        }}
      >
        {dayjs().subtract(i, "year").format("YYYY")}
      </p>,
    );
  }

  return <Wrapper className="tp-calendar-year-select" ref={ref}> {years} </Wrapper>;
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
  > p {
    display: block;
    margin: 0;
    padding: 6px 0;
    text-align: center;
    width: 100% !important;
    color: ${({ theme }) => theme.grey[900]} !important;
    :hover {
      background-color: ${({ theme }) => theme.primary.light};
    }
  }
`;
