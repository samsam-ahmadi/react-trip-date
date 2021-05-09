import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "constant";

interface Props {
  children: ReactNode;
}

export const TestProviders = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
