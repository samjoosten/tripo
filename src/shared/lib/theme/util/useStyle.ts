import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { useAppStore } from 'shared/model';

export const useStyle = <T extends ViewStyle | TextStyle | ImageStyle>(light: T, dark: T) => {
  const theme = useAppStore((state) => state.theme);
  return theme === 'dark' ? dark : light;
};
