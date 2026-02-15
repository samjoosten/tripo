import type { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { AppNavigation, type RootStackParamList } from './navigation';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/'), 'https://tripo-app.com'],
  config: {
    screens: {
      [AppNavigation.JOIN_GROUP]: 'join/:groupId',
    },
  },
};
