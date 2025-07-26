import type { NavigationTabLists } from './tab-navigation';

export enum AppNavigation {
  LOGIN = 'Login',
  REGISTER = 'Register',
  MAIN = 'Main',
  PROFILE = 'Profile',
  SETTINGS = 'Settings',
}

export type NavigationStackLists = {
  [AppNavigation.LOGIN]: undefined;
  [AppNavigation.REGISTER]: undefined;
  [AppNavigation.MAIN]: undefined;
  [AppNavigation.PROFILE]: undefined;
  [AppNavigation.SETTINGS]: undefined;
};

export type RootStackParamList = NavigationStackLists & NavigationTabLists;
