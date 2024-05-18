import { COLORS } from "./colors";

export const appTheme = {
  background: COLORS.white,
  primary: COLORS.primary800,
  secondary: COLORS.gray800,
  highlight: COLORS.primary800
}

export const navTheme = {
  dark: false,
  colors: {
    background: appTheme.background,
    border: appTheme.secondary,
    card: appTheme.background,
    notification: appTheme.highlight,
    primary: appTheme.primary,
    text: appTheme.primary
  }
}

export const sizing = {
  ICON_SIZE_XS: 15,
  ICON_SIZE_S: 20,
  ICON_SIZE_M: 25,
}