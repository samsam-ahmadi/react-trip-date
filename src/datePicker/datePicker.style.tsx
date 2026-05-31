import styled, { css } from "styled-components";

type DirectionalProps = {
  $jalali: boolean;
};

type MonthProps = {
  $numberOfMonths: number;
};

export const Wrapper = styled.div<DirectionalProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  flex-direction: ${({ $jalali }) => ($jalali ? "row-reverse" : "row")};
`;

export const Month = styled.div<MonthProps>`
  height: 350px;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  width: ${({ $numberOfMonths }) => css`calc(${100 / $numberOfMonths}%)`};
`;

export const Weeks = styled.div<DirectionalProps>`
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: ${({ $jalali }) => ($jalali ? "row-reverse" : "row")};
`;
