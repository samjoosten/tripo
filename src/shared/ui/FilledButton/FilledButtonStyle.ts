import { StyleSheet } from 'react-native';

import { sv } from 'shared/lib/theme';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderCurve: 'continuous',
    paddingHorizontal: sv('spacing.lg'),
    paddingVertical: sv('spacing.m'),
    rowGap: sv('spacing.xs'),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: sv('spacing.xs'),
  },
});
