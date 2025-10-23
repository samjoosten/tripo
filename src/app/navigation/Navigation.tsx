import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useTranslation } from 'react-i18next';

import { LoginScreen, RegistrationScreen } from 'screens';
import { cv } from 'shared/lib/theme';
import type { NavigationStackLists } from 'shared/routes';
import { AppNavigation } from 'shared/routes';

import { TabNavigation } from './TabNavigation';

export const Stack = createNativeStackNavigator<NavigationStackLists>();

const Navigation = () => {
  const { t } = useTranslation();
  const isAuthenticated = false; // supabase useAuth();

  return (
    <NavigationContainer onReady={() => SplashScreen.hideAsync()}>
      <Stack.Navigator
        initialRouteName={AppNavigation.LOGIN}
        screenOptions={{
          headerTitleStyle: { fontFamily: 'Gilroy-SemiBold', color: cv('gray.900') },
        }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name={AppNavigation.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name={AppNavigation.REGISTER}
              component={RegistrationScreen}
              options={{ title: t('register.title') }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={AppNavigation.MAIN} options={{ headerShown: false }} component={TabNavigation} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
