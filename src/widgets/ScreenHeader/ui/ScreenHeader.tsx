import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeColor } from 'shared/lib/theme';
import { sizeValue as sv } from 'shared/lib/theme/util/sizeValue';
import { ThemedText } from 'shared/ui/ThemedText';

export const ScreenHeader = (props: NativeStackHeaderProps) => {
  const { top } = useSafeAreaInsets();
  const backgroundColor = useThemeColor('scaffold');
  const borderColor = useThemeColor('divider');
  return (
    <View
      style={[
        styles.container,
        { backgroundColor, borderColor, paddingTop: top + sv('spacing.sm'), paddingBottom: sv('spacing.sm') },
      ]}>
      <ThemedText type='sectionHeader'>{props.options.title}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
});
