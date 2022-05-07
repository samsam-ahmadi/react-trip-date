export const theme = {
  primary: {
    light: "#d0f4f0",
    main: "#13c8b5",
    dark: "#12baa9",
  },
  grey: {
    700: "#707070",
    900: "#1b1b1d",
  },
  background: {
    default: "#f5f5f5",
  },
  text: {
    disabled: "#BABABA",
  },
  shape: {
    borderRadius: 4,
  },
};

export interface Theme {
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
  shape: {
    borderRadius: number;
  };
}
