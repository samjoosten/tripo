import type { BottomTabBarProps, BottomTabNavigatorProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import LoginScreen from 'screens/login/ui/LoginScreen';
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
      <Tab.Screen name={AppTabNavigation.MAIN} component={LoginScreen} />
      <Tab.Screen name={AppTabNavigation.ADD} component={LoginScreen} />
      <Tab.Screen name={AppTabNavigation.PROFILE} component={LoginScreen} />
    </Tab.Navigator>
  );
};
