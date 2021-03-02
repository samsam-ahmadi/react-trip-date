import styled from "styled-components";

type Props = {
  jalali: boolean;
};

export const TitleOfWeek: React.FunctionComponent<Props> = ({ jalali }) => {
  let titleDayFa = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  let titleDayEn = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  let title = jalali ? titleDayFa : titleDayEn;

  return (
    <Wrapper jalali={jalali}>
      {title.map(item => (
        <p key={item}>{item}</p>
      ))}
    </Wrapper>
  );
};

export const Wrapper = styled.div<Props>`
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
