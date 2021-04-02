import "styled-components";

import { Theme } from "constant/theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
