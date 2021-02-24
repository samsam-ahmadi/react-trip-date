import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  primary: {
    light: '#d0f4f0',
    main: '#13c8b5',
    dark: '#12baa9',
  },
  secondary: {
    light: '#31D6AA',
    main: '#1ec699',
    dark: '#06C390',
  },
  grey: {
    50: '#fafafa',
    100: '#F0F0F0',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#969696',
    700: '#707070',
    800: '#47464c',
    900: '#1b1b1d',
  },
  background: {
    paper: '#fff',
    default: '#f5f5f5',
  },
  text: {
    primary: '#1B1B1D',
    secondary: '#47464C',
    disabled: '#BABABA',
    hint: '#707070',
  },
  divider: '#EAEAEA',
  shadows: {
    0: '0 1px 5px 0 rgba(27, 27, 29, 0.1)',
    1: '0 2px 10px 0 rgba(27, 27, 29, 0.1)',
    2: '0 2px 20px 0 rgba(27, 27, 29, 0.1)',
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h6: {
      fontSize: '1rem',
      color: '#1b1b1d',
      lineHeight: '1.25',
    },
    body2: {
      color: '#1b1b1d',
      lineHeight: '1.21',
    },
  },
  shape: {
    borderRadius: '8px',
  },
};
