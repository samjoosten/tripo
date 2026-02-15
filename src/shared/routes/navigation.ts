import type { NavigationTabLists } from './tab-navigation';

export enum AppNavigation {
  LOGIN = 'Login',
  REGISTER = 'Register',
  MAIN = 'Main',
  PROFILE = 'Profile',
  SETTINGS = 'Settings',
  JOIN_GROUP = 'Join',
}

export type NavigationStackLists = {
  [AppNavigation.LOGIN]: undefined;
  [AppNavigation.REGISTER]: undefined;
  [AppNavigation.MAIN]: undefined;
  [AppNavigation.PROFILE]: undefined;
  [AppNavigation.SETTINGS]: undefined;
  [AppNavigation.JOIN_GROUP]: undefined;
};

export type RootStackParamList = NavigationStackLists & NavigationTabLists;

export const UNAUTHORIZED_ROUTES: Array<AppNavigation> = [
  AppNavigation.LOGIN,
  AppNavigation.REGISTER,
  AppNavigation.JOIN_GROUP,
];
