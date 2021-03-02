import styled from "styled-components";
import { Dayjs } from "dayjs";

type Props = {
  day: Dayjs;
};

export const Day: React.FC<Props> = ({ day }) => {
  return (
    <Wrapper data-test={day.format("MM-DD-dddd")}>{day.format("DD")}</Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 50%;
  margin-left: 5px;
  margin-bottom: 5px;
  width: 38px;
  height: 38px;
  transition: all 0.15s ease-in-out;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.primary.dark};
    color: ${({ theme }) => theme.grey[50]};
  }
`;
