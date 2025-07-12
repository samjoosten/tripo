/* eslint-disable react-native/no-unused-styles */
import { StyleSheet, View } from 'react-native';

import type { SizingType } from 'shared/lib/theme';
import { sv } from 'shared/lib/theme';

type Props = {
  size?: SizingType;
  fill?: boolean;
  direction?: 'horizontal' | 'vertical';
};

export const Spacer = ({ size = 'spacing.m', fill = false, direction = 'vertical' }: Props) => {
  const sizeValue = size ? sv(size) : undefined;

  return (
    <View
      style={[
        styles[direction],
        fill
          ? { flex: 1 }
          : {
              width: direction === 'horizontal' ? sizeValue : undefined,
              height: direction === 'vertical' ? sizeValue : undefined,
            },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
});
