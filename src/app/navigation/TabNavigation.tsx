import type { BottomTabBarProps, BottomTabNavigatorProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AddScreen, HomeScreen, ProfileScreen } from 'screens';
import { AppTabNavigation, type NavigationTabLists } from 'shared/routes';
import { ThemedTabNavigation } from 'widgets/ThemedTabNavigation';

export const Tab = createBottomTabNavigator<NavigationTabLists>();

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
  const renderTabBar = (props: BottomTabBarProps) => <ThemedTabNavigation {...props} />;
  return (
    <Tab.Navigator tabBar={renderTabBar} {...props}>
      <Tab.Screen name={AppTabNavigation.MAIN} component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name={AppTabNavigation.ADD} component={AddScreen} />
      <Tab.Screen name={AppTabNavigation.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};
