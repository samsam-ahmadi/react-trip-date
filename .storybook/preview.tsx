import type { Preview } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import React from "react";

import { theme as defaultTheme } from "../src/constant/theme";

const indigoTheme = {
  ...defaultTheme,
  primary: {
    light: "#757ce8",
    main: "#3f50b5",
    dark: "#002884",
  },
};

const pinkTheme = {
  ...defaultTheme,
  primary: {
    light: "#ffd4e5",
    main: "#e91e63",
    dark: "#ad1457",
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    a11y: {
      element: "#storybook-root",
      manual: false,
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "muted", value: "#f5f5f5" },
        { name: "dark", value: "#1b1b1d" },
      ],
    },
    options: {
      storySort: {
        order: [
          "Docs",
          [
            "Introduction",
            "Getting Started",
            "Theming",
            "Localization",
            "Accessibility",
            "Migration v1 → v2",
          ],
          "Components",
          ["DatePicker", "RangePicker", "Calendar"],
          "API",
        ],
      },
    },
  },
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        Default: defaultTheme,
        Indigo: indigoTheme,
        Pink: pinkTheme,
      },
      defaultTheme: "Default",
      Provider: ThemeProvider as unknown as React.ComponentType<{
        theme: unknown;
      }>,
    }),
  ],
};

export default preview;
