import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft01Icon } from '@hugeicons-pro/core-stroke-standard';

import { sv, useThemeConfigColor } from 'shared/lib/theme';
import { ThemedText } from 'shared/ui/ThemedText';

import { HeaderButton } from './HeaderButton';

export const ScreenHeader = (props: NativeStackHeaderProps) => {
  const { top } = useSafeAreaInsets();
  const backgroundColor = useThemeConfigColor('scaffold');
  const borderColor = useThemeConfigColor('divider');

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, borderColor, paddingTop: top + sv('spacing.sm'), paddingBottom: sv('spacing.xs') },
      ]}>
      <View style={{ flex: 1 }}>
        {!!(props.navigation.canGoBack() && props.options.headerBackVisible) && (
          <HeaderButton icon={ArrowLeft01Icon} onPress={() => props.navigation.goBack()} />
        )}
      </View>
      <ThemedText type='sectionHeader'>{props.options.title}</ThemedText>
      <View style={styles.headerRight}>{props.options.headerRight ? props.options.headerRight({}) : null}</View>
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
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
