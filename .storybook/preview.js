import { DocsContainer, DocsPage } from "@storybook/addon-docs";
import { addParameters } from "@storybook/react";

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});
