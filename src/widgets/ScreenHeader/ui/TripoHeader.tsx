import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { sv, useThemeColor } from 'shared/lib/theme';
import Row from 'shared/ui/Row';
import { ThemedText } from 'shared/ui/ThemedText';

export const TripoHeader = () => {
  const { top } = useSafeAreaInsets();
  const headerColor = useThemeColor({ light: 'azure.500', dark: 'azure.300' });

  return (
    <Row
      justify='center'
      align='center'
      style={[
        styles.row,
        {
          paddingTop: top + sv('spacing.2xs'),
        },
      ]}>
      <View style={styles.headerContainer}>
        <ThemedText type='sectionHeader' style={[styles.headerText, { color: headerColor }]}>
          Tripo
        </ThemedText>
      </View>
    </Row>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    paddingBottom: sv('spacing.xs'),
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'ArchitectsDaughter-Regular',
  },
});
