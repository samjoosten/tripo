import type { DerivedValue } from 'react-native-reanimated';

export const getButtonGradient = (
  lightColor: string | undefined,
  darkColor: string | undefined,
  gradientColors: DerivedValue<Array<string>>
) => {
  return lightColor || darkColor ? undefined : gradientColors;
};
