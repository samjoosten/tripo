import type { NativeStackHeaderItemProps, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect } from 'react';
import type { ViewProps } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { sv, useThemeColor } from 'shared/lib/theme';
import type { RootStackParamList } from 'shared/routes';

import { ThemedText } from '../ThemedText';

type Props = {
  withTopSafeArea?: boolean;
  withBottomSafeArea?: boolean;
  horizontalPadding?: number;
  headerAction?: string;
  onHeaderActionPress?: () => void;
} & ViewProps &
  NativeStackScreenProps<RootStackParamList, keyof RootStackParamList>;

export const ScreenContent = ({
  withBottomSafeArea,
  withTopSafeArea,
  horizontalPadding,
  children,
  style,
  headerAction,
  navigation,
  onHeaderActionPress,
  ...rest
}: Props) => {
  const { top, bottom } = useSafeAreaInsets();
  const backgroundColor = useThemeColor('scaffold');

  const renderHeaderAction = useCallback(
    (_: NativeStackHeaderItemProps) => {
      if (!headerAction) return null;

      return (
        <Pressable onPress={onHeaderActionPress} style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}>
          <ThemedText type='button' lightColor='azure.500' darkColor='azure.300'>
            {headerAction}
          </ThemedText>
        </Pressable>
      );
    },
    [headerAction, onHeaderActionPress]
  );

  useEffect(() => {
    if (!headerAction) return;

    navigation.setOptions({
      headerRight: renderHeaderAction,
    });
  }, [navigation, headerAction, renderHeaderAction]);

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
        { backgroundColor },
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
  },
});
