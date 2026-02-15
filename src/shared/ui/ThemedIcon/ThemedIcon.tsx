import type { HugeiconsProps } from '@hugeicons/react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import Animated from 'react-native-reanimated';

import type { ColorPaletteType, SizingType } from 'shared/lib/theme';
import { sv, useThemeConfigColor } from 'shared/lib/theme';

import type { IconSvgObject } from './types';

type Props = {
  size?: SizingType;
  lightColor?: ColorPaletteType;
  darkColor?: ColorPaletteType;
  icon: IconSvgObject;
} & HugeiconsProps;

export const ThemedIcon = ({ icon, size = 'icon.m', lightColor, darkColor, ...rest }: Props) => {
  const sizeValue = sv(size);
  const themeColor = useThemeConfigColor('icon', { light: lightColor, dark: darkColor });
  return <HugeiconsIcon icon={icon} size={sizeValue} color={themeColor} {...rest} />;
};

export const AnimatedIcon = Animated.createAnimatedComponent(ThemedIcon);
