import type { TextProps} from 'react-native';
import { Text } from 'react-native';

import type { ColorPaletteType, SizingType} from 'shared/lib/theme';
import { cv, sv } from 'shared/lib/theme';

import { styles } from './ThemedTextStyle';

type Props = {
  type: keyof typeof styles,
  color?: ColorPaletteType,
  size?: SizingType
} & TextProps;

export const ThemedText = ({ type, color, size, ...rest }: Props) => {
  const colorValue = color ? cv(color) : undefined;
  const sizeValue = size ? sv(size) : undefined;
  
  return <Text
style={[
    styles[type],
    color && { color: colorValue },
    size && { fontSize: sizeValue }
  ]} {...rest} />;
};