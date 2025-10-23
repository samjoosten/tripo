import { StyleSheet, View } from 'react-native';

import { useThemeColor, type ColorPaletteType } from 'shared/lib/theme';

type Props = {
  lightColor?: ColorPaletteType;
  darkColor?: ColorPaletteType;
};

const Divider = ({ lightColor, darkColor }: Props) => {
  const color = useThemeColor('divider', { light: lightColor, dark: darkColor });

  return <View style={[styles.container, { backgroundColor: color }]} />;
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    width: '100%',
  },
});

export default Divider;
