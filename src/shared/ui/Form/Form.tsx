import type { ViewProps } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { sv } from 'shared/lib/theme';

export const Form = ({ children, ...rest }: ViewProps) => {
  return (
    <View style={styles.container} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: sv('spacing.lg'),
    width: '100%',
  },
});
