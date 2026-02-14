import { useAppStore } from 'shared/model';

import { THEME_CONFIG } from '../const/themeConfig';
import type { ColorPaletteType } from '../types/palette';

import { colorValue } from './useColorValue';

type ThemeConfigKey = keyof (typeof THEME_CONFIG)['light'];

type Props = {
  light?: ColorPaletteType;
  dark?: ColorPaletteType;
};

export const useThemeConfigColor = (key: ThemeConfigKey, props?: Props) => {
  const theme = useAppStore((state) => state.theme);

  const colorFromProps = props?.[theme];

  if (colorFromProps) {
    return colorValue(colorFromProps);
  }

  const colorFromConfig = THEME_CONFIG[theme][key];

  return colorValue(colorFromConfig as ColorPaletteType);
};

export const useThemeColor = ({ light, dark }: Required<Props>) => {
  const theme = useAppStore((state) => state.theme);

  const colorFromProps = theme === 'light' ? light : dark;

  return colorValue(colorFromProps);
};
