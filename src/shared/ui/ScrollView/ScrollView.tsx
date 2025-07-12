import { forwardRef } from 'react';
import { ScrollView as RNScrollView, type ScrollViewProps } from 'react-native';

import { sv } from 'shared/lib/theme';

export const ScrollView = forwardRef<RNScrollView, ScrollViewProps>((props: ScrollViewProps, ref) => {
  const { contentContainerStyle, ...rest } = props;
  return (
    <RNScrollView
      ref={ref}
      style={{ flex: 1 }}
      contentContainerStyle={[{ flexGrow: 1, paddingHorizontal: sv('spacing.lg') }, contentContainerStyle]}
      {...rest}
    />
  );
});
