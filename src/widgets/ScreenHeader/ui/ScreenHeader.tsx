import { ArrowLeft01Icon } from '@hugeicons-pro/core-stroke-rounded';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeColor } from 'shared/lib/theme';
import { sizeValue as sv } from 'shared/lib/theme/util/sizeValue';
import { ThemedText } from 'shared/ui/ThemedText';

import { HeaderButton } from './HeaderButton';

export const ScreenHeader = (props: NativeStackHeaderProps) => {
  const { top } = useSafeAreaInsets();
  const backgroundColor = useThemeColor('scaffold');
  const borderColor = useThemeColor('divider');

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, borderColor, paddingTop: top + sv('spacing.sm'), paddingBottom: sv('spacing.xs') },
      ]}>
      <View style={{ flex: 1 }}>
        {props.navigation.canGoBack() && (
          <HeaderButton icon={ArrowLeft01Icon} onPress={() => props.navigation.goBack()} />
        )}
      </View>
      <ThemedText type='sectionHeader'>{props.options.title}</ThemedText>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        {props.options.headerRight ? props.options.headerRight({}) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: sv('spacing.sm'),
  },
});
