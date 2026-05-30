import "styled-components";

import { Theme } from "constant/theme";

declare module "styled-components" {
  // Module-augmentation: extends styled-components' DefaultTheme with our Theme shape.
  // The empty body is intentional — Theme provides all members via extends.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
