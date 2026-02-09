import type { HugeiconsProps } from '@hugeicons/react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import Animated from 'react-native-reanimated';

import type { ColorPaletteType } from 'shared/lib/theme';
import { sv, useThemeColor } from 'shared/lib/theme';

import type { IconSvgObject } from './types';

type Props = {
  size?: number;
  lightColor?: ColorPaletteType;
  darkColor?: ColorPaletteType;
  icon: IconSvgObject;
} & HugeiconsProps;

export const ThemedIcon = ({ icon, size = sv('icon.m'), lightColor, darkColor, ...rest }: Props) => {
  const themeColor = useThemeColor('icon', { light: lightColor, dark: darkColor });
  return <HugeiconsIcon icon={icon} size={size} color={themeColor} {...rest} />;
};

export const AnimatedIcon = Animated.createAnimatedComponent(ThemedIcon);
