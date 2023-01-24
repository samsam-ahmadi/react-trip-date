import styled from "styled-components";
import { ElementType, FC } from "react";

type Props = {
  jalali: boolean;
  startOfWeek: number;
  components?: {
    titles?: string[];
    wrapper?: ElementType<{ jalali: boolean; startOfWeek: number }>;
  };
};

export const TitleOfWeek: FC<Props> = ({ jalali, startOfWeek, components }) => {
  let titles = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  if (components?.titles) titles = [...components?.titles];
  else if (jalali) titles = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

  if (!jalali) {
    let sow = startOfWeek % 7;
    if (sow > 0) while (sow--) titles.push(titles.shift()!);
  }

  if (components?.wrapper) {
    const WrapperC = components.wrapper;
    return <WrapperC jalali={jalali} startOfWeek={startOfWeek} />;
  }

  return (
    <Wrapper
      className="tp-calendar-week-titles"
      jalali={jalali}
      startOfWeek={startOfWeek}
    >
      {titles.map(item => (
        <p key={item}>{item}</p>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div<Props>`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: ${({ jalali }) => (jalali ? "row-reverse" : "row")};
  border-bottom: 1px solid #e2e2e2;
  margin: 30px 0 15px 0;
  p {
    width: 38px;
    margin-bottom: 15px;
    margin-left: 5px;
  }
`;
