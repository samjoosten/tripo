import { useAppStore } from 'shared/model';

import { COLOR_PALETTE } from '../const/color-palette';
import type { ColorPaletteType } from '../types/palette';

export const colorValue = (color: ColorPaletteType) => {
  if (color.includes('.')) {
    const [parent, child] = color.split('.') as [
      keyof typeof COLOR_PALETTE,
      keyof (typeof COLOR_PALETTE)[keyof typeof COLOR_PALETTE],
    ];
    return COLOR_PALETTE[parent]?.[child];
  } else {
    return (COLOR_PALETTE as unknown as Record<string, string>)[color];
  }
};

export const useColor = (lightColor: ColorPaletteType, darkColor?: ColorPaletteType) => {
  const theme = useAppStore((state) => state.theme);
  return theme === 'dark' ? colorValue(darkColor || lightColor) : colorValue(lightColor);
};
