import type { PressableProps } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';

import { sv, useThemeColor } from 'shared/lib/theme';
import { RoundedView } from 'shared/ui/RoundedView';
import { ThemedIcon, type IconSvgObject } from 'shared/ui/ThemedIcon';

const SIZE = 36;

type Props = {
  icon: IconSvgObject;
} & PressableProps;

export const HeaderButton = ({ icon, ...rest }: Props) => {
  const colorValue = useThemeColor('button.border', { light: 'powderBlue.50', dark: 'powderBlue.700' });
  const backgroundColor = useThemeColor('scaffold', { light: 'scaffoldButton', dark: 'scaffoldButtonDark' });
  return (
    <Pressable {...rest} style={{ padding: sv('spacing.2xs') }}>
      <RoundedView style={[styles.container, { backgroundColor }]} borderWidth={2} borderColor={colorValue}>
        <ThemedIcon icon={icon} lightColor='powderBlue.400' darkColor='white' />
      </RoundedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: sv('spacing.sm'),
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZE,
    height: SIZE,
  },
});
