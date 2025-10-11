import type { COLOR_PALETTE } from '../const/colorPalette';

export type ColorPaletteType =
  | keyof typeof COLOR_PALETTE
  | `${keyof typeof COLOR_PALETTE}.${keyof (typeof COLOR_PALETTE)[keyof typeof COLOR_PALETTE]}`;
