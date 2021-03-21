import styled from "styled-components";
import { ElementType } from "react";

type Props = {
  jalali: boolean;
  components?: {
    titles?: string[];
    wrapper?: ElementType<{ jalali: boolean }>;
  };
};

export const TitleOfWeek: React.FunctionComponent<Props> = ({
  jalali,
  components,
}) => {
  let titleDayFa = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  let titleDayEn = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  let title = jalali ? titleDayFa : titleDayEn;

  if (components?.wrapper) {
    const WrapperC = components?.wrapper;
    return <WrapperC jalali={jalali} />;
  }

  return (
    <Wrapper jalali={jalali}>
      {components?.titles &&
        components?.titles.map(item => <p key={item}>{item}</p>)}

      {!components?.titles && title.map(item => <p key={item}>{item}</p>)}
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
