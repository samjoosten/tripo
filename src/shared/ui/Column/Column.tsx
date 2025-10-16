import type { ViewProps, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { sv, type SizingType } from 'shared/lib/theme';

type Props = {
  spacing?: SizingType;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
} & ViewProps;

const Column = ({ spacing, align, justify, ...rest }: Props) => {
  const spacingValue = sv(spacing || 'spacing.m');
  return (
    <View style={[styles.container, { rowGap: spacingValue, alignItems: align, justifyContent: justify }]} {...rest} />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default Column;
