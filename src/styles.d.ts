import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primary: {
      light: string;
      main: string;
      dark: string;
    };
    grey: {
      700: string;
      900: string;
    };
    background: {
      default: string;
    };
    text: {
      disabled: string;
    };
  }
}
