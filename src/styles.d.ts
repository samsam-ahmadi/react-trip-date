import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: {
      light: string;
      main: string;
      dark: string;
    };
    secondary: {
      light: string;
      main: string;
      dark: string;
    };
    grey: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    background: {
      paper: string;
      default: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      hint: string;
    };
    divider: string;
    shadows: {
      0: string;
      1: string;
      2: string;
    };
    typography: {
      fontFamily: string;
      h6: {
        fontSize: string;
        color: string;
        lineHeight: string;
      };
      body2: {
        color: string;
        lineHeight: string;
      };
    };
    shape: {
      borderRadius: string;
    };
  }
}
