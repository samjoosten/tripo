import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';

const PRESSED_OPACITY = 0.75;

export type Props = {
  style?: Omit<StyleProp<ViewStyle>, 'opacity'>;
} & Omit<PressableProps, 'style'>;

export const PressableOpacity = ({ style, ...rest }: Props) => {
  return <Pressable {...rest} style={({ pressed }) => [{ opacity: pressed ? PRESSED_OPACITY : 1 }, style]} />;
};
