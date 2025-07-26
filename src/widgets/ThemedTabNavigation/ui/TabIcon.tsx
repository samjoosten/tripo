import { Add01Icon, Home11Icon, UserCircle02Icon } from '@hugeicons-pro/core-stroke-rounded';
import { Home11SolidRounded, UserCircle02SolidRounded } from '@hugeicons-pro/core-solid-rounded';
import type { BottomTabNavigationEventMap, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import {
  useLinkBuilder,
  type NavigationHelpers,
  type NavigationRoute,
  type ParamListBase,
  type TabNavigationState,
} from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { cv, sv } from 'shared/lib/theme';
import { AppTabNavigation } from 'shared/routes';
import { ThemedIcon, type IconSvgObject } from 'shared/ui/ThemedIcon';
import { RoundedView } from 'shared/ui/RoundedView/RoundedView';

type Props = {
  route: NavigationRoute<ParamListBase, string>;
  index: number;
  state: TabNavigationState<ParamListBase>;
  options: BottomTabNavigationOptions;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

const iconByRouteName: Record<AppTabNavigation, { selected: IconSvgObject; default: IconSvgObject }> = {
  [AppTabNavigation.MAIN]: {
    selected: Home11SolidRounded,
    default: Home11Icon,
  },
  [AppTabNavigation.ADD]: {
    selected: Add01Icon,
    default: Add01Icon,
  },
  [AppTabNavigation.PROFILE]: {
    selected: UserCircle02SolidRounded,
    default: UserCircle02Icon,
  },
};

export const TabIcon = (props: Props) => {
  const { options, route, state, navigation, index } = props;
  const { buildHref } = useLinkBuilder();

  const tabScale = useSharedValue(1);

  const icon = iconByRouteName[route.name as AppTabNavigation] || Home11Icon;
  const isMiddleTab = state.routes.length % 2 === 1 && index === Math.floor(state.routes.length / 2);
  const isFocused = state.index === index;
  const iconColor = isFocused ? cv('azure.500') : cv('gray.900');

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  const onPressIn = () => {
    tabScale.value = withTiming(0.95, { duration: 150 });
  };

  const onPressOut = () => {
    tabScale.value = withTiming(1, { duration: 150 });
  };

  const aTabStyle = useAnimatedStyle(() => ({
    transform: [{ scale: tabScale.value }],
  }));

  return (
    <PlatformPressable
      href={buildHref(route.name, route.params)}
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarButtonTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      pressOpacity={1}
      android_ripple={null}
      style={{ flex: 1 }}>
      <View style={[styles.tabContainer]}>
        {isMiddleTab ? (
          <RoundedView style={styles.middleIconContainer}>
            <ThemedIcon icon={icon.default} color={cv('white')} size={sv('spacing.lg')} />
          </RoundedView>
        ) : (
          <Animated.View
            layout={LinearTransition}
            style={[styles.iconContainer, isFocused && styles.selectedTabIcon, aTabStyle]}>
            <ThemedIcon icon={isFocused ? icon.selected : icon.default} color={iconColor} size={sv('spacing.lg')} />
            {!!isFocused && <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.tabSelectedIndicator} />}
          </Animated.View>
        )}
      </View>
    </PlatformPressable>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    height: 70,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTabIcon: {
    rowGap: sv('spacing.xs'),
  },
  middleIconContainer: {
    backgroundColor: cv('azure.500'),
    borderRadius: 12,
    padding: sv('spacing.m'),
  },
  tabSelectedIndicator: {
    width: 15,
    backgroundColor: cv('azure.500'),
    height: 2,
    borderRadius: 100,
  },
});
