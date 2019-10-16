import * as React from "react";
import { JustifyContentProperty, AlignItemsProperty } from "csstype";
import styled from "styled-components";

export interface BoxProps extends React.HTMLProps<HTMLDivElement> {
  component?: string;
  column?: boolean;
  justifyContent?: JustifyContentProperty;
  alignItems?: AlignItemsProperty;
  order?: number;
  flex?: string;
  flexWrap?: boolean;
  reverse?: boolean;
}

const Box = styled.div<BoxProps>(props => ({
  display: "flex",
  flexDirection: `${props.column ? "column" : "row"}${
    props.reverse ? "-reverse" : ""
  }` as any,
  justifyContent: props.justifyContent || undefined,
  alignItems: props.alignItems || undefined,
  order: props.order || undefined,
  flex: props.flex || undefined,
  flexWrap: props.flexWrap ? "wrap" : undefined
}));

export default Box;
