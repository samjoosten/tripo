import type { ViewProps } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cv, sv } from 'shared/lib/theme';

type Props = {
  withTopSafeArea?: boolean;
  withBottomSafeArea?: boolean;
  horizontalPadding?: number;
} & ViewProps;

export const ScreenContent = ({
  withBottomSafeArea,
  withTopSafeArea,
  horizontalPadding,
  children,
  style,
  ...rest
}: Props) => {
  const { top, bottom } = useSafeAreaInsets();

  const getTopPadding = () => {
    if (withTopSafeArea) {
      return top;
    }
    return 0;
  };

  const getBottomPadding = () => {
    if (withBottomSafeArea) {
      return bottom;
    }
    return 0;
  };

  const getHorizontalPadding = () => {
    if (horizontalPadding) {
      return horizontalPadding;
    }
    return sv('spacing.lg');
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: getTopPadding(), paddingBottom: getBottomPadding(), paddingHorizontal: getHorizontalPadding() },
        style,
      ]}
      {...rest}>
      {children}
    </View>
  );
};

export const AnimatedScreenContent = Animated.createAnimatedComponent(ScreenContent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cv('scaffold'),
  },
});
