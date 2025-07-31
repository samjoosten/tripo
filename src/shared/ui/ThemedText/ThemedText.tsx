import type { TextProps } from 'react-native';
import { Text } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import type { ColorPaletteType, SizingType } from 'shared/lib/theme';
import { cv, sv } from 'shared/lib/theme';

import { styles } from './ThemedTextStyle';

type Props = {
  type: keyof typeof styles;
  color?: ColorPaletteType;
  size?: SizingType;
  fontFamily?: string;
} & TextProps;

export const ThemedText = ({ type, color, size, fontFamily, ...rest }: Props) => {
  const colorValue = color ? cv(color) : undefined;
  const sizeValue = size ? sv(size) : undefined;

  return (
    <Text
      style={[
        styles[type],
        color && { color: colorValue },
        size && { fontSize: sizeValue },
        fontFamily && { fontFamily },
      ]}
      {...rest}
    />
  );
};

type AnimatedProps = {
  type: keyof typeof styles;
  color?: SharedValue<string>;
  size?: SharedValue<number>;
} & TextProps;

export const AnimatedThemedText = ({ type, color, size, ...rest }: AnimatedProps) => {
  const colorValue = color ?? undefined;
  const sizeValue = size ?? undefined;

  const animatedStyle = useAnimatedStyle(() => ({
    color: colorValue?.value,
    fontSize: sizeValue?.value,
  }));

  return <Animated.Text style={[styles[type], animatedStyle]} {...rest} />;
};
