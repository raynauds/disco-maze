import { UITheme } from "../theme/theme"

declare module "styled-components" {
  export interface DefaultTheme extends UITheme {}
}
