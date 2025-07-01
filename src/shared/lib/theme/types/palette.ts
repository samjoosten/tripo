import type { COLOR_PALETTE } from '../const/color-palette';

export type ColorPaletteType =
  | keyof typeof COLOR_PALETTE
  | `${keyof typeof COLOR_PALETTE}.${keyof (typeof COLOR_PALETTE)[keyof typeof COLOR_PALETTE]}`;