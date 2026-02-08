import type { PressableProps } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';

import { sv, useThemeColor } from 'shared/lib/theme';
import { RoundedView } from 'shared/ui/RoundedView';
import { ThemedIcon, type IconSvgObject } from 'shared/ui/ThemedIcon';

type Props = {
  icon: IconSvgObject;
} & PressableProps;

export const HeaderButton = ({ icon, ...rest }: Props) => {
  const colorValue = useThemeColor('button.border');
  return (
    <Pressable {...rest}>
      <RoundedView style={styles.container} borderWidth={2}>
        <ThemedIcon icon={icon} />
      </RoundedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: sv('spacing.m'),
    borderRadius: 12,
  },
});
