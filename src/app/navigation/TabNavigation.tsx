import type { BottomTabBarProps, BottomTabNavigatorProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AddScreen, HomeScreen, ProfileScreen } from 'screens';
import { sv, useThemeConfigColor } from 'shared/lib/theme';
import { AppTabNavigation, type NavigationTabLists } from 'shared/routes';
import { ThemedTabNavigation } from 'widgets/ThemedTabNavigation';

export const Tab = createBottomTabNavigator<NavigationTabLists>();

const NAVBAR_HEIGHT = 65;

type Props = Omit<
  BottomTabNavigatorProps,
  | 'initialRouteName'
  | 'children'
  | 'layout'
  | 'screenListeners'
  | 'screenOptions'
  | 'screenLayout'
  | 'UNSTABLE_router'
  | 'id'
>;

export type NavigatorElement = ReturnType<typeof createBottomTabNavigator<NavigationTabLists>>;

export const TabNavigation = (props: Props) => {
  const { bottom } = useSafeAreaInsets();
  const backgroundColor = useThemeConfigColor('scaffold');
  const containerHeight = NAVBAR_HEIGHT + bottom;

  const renderTabBar = (props: BottomTabBarProps) => (
    <View style={[styles.tabContainer, { backgroundColor, height: containerHeight + sv('spacing.xs') }]}>
      <ThemedTabNavigation {...props} containerHeight={containerHeight} />
    </View>
  );
  return (
    <Tab.Navigator tabBar={renderTabBar} {...props}>
      <Tab.Screen name={AppTabNavigation.MAIN} component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name={AppTabNavigation.ADD} component={AddScreen} />
      <Tab.Screen name={AppTabNavigation.PROFILE} component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    width: '100%',
  },
});
