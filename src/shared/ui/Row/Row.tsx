import type { ViewProps, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { sv, type SizingType } from 'shared/lib/theme';

type Props = {
  spacing?: SizingType;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
} & ViewProps;

const Row = ({ spacing, align, justify, ...rest }: Props) => {
  const spacingValue = sv(spacing || 'spacing.m');
  return (
    <View
      style={[styles.container, { columnGap: spacingValue, alignItems: align, justifyContent: justify }]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default Row;
