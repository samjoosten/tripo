import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { LoginScreen, RegistrationScreen } from 'screens';
import { cv } from 'shared/lib/theme';
import type { NavigationStackLists } from 'shared/routes';
import { AppNavigation } from 'shared/routes';
import { ScreenHeader } from 'widgets/ScreenHeader';
import { useAuth } from 'shared/auth';

import { TabNavigation } from './TabNavigation';

export const Stack = createNativeStackNavigator<NavigationStackLists>();

const Navigation = () => {
  const { t } = useTranslation();
  const [navigationReady, setNavigationReady] = useState(false);
  const { claims, authPending } = useAuth(); // supabase useAuth();

  const isAuthenticated = claims !== null && claims.is_anonymous !== true;

  useEffect(() => {
    if (!navigationReady || authPending) return;

    // Hide the splash screen once navigation is ready and auth state is determined
    const timeout = setTimeout(() => {
      void SplashScreen.hideAsync();
    }, 400);

    return () => clearTimeout(timeout);
  }, [authPending, navigationReady]);

  return (
    <NavigationContainer onReady={() => setNavigationReady(true)}>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? AppNavigation.MAIN : AppNavigation.LOGIN}
        screenOptions={{
          headerTitleStyle: { fontFamily: 'Gilroy-SemiBold', color: cv('gray.900') },
        }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name={AppNavigation.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name={AppNavigation.REGISTER}
              component={RegistrationScreen}
              options={{
                title: t('register.title'),
                header: ScreenHeader,
              }}
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
