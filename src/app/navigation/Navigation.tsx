import { X } from '@hugeicons-pro/core-stroke-standard';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { JoinGroupScreen, LoginScreen, RegistrationScreen } from 'screens';
import { useAuth } from 'shared/auth';
import { cv } from 'shared/lib/theme';
import type { NavigationStackLists } from 'shared/routes';
import { AppNavigation, linking } from 'shared/routes';
import { ScreenHeader } from 'widgets/ScreenHeader';
import { HeaderButton } from 'widgets/ScreenHeader/ui/HeaderButton';
import type { IconSvgObject } from 'shared/ui/ThemedIcon';

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

  const renderHeaderRight = (icon: IconSvgObject, onPress?: () => void) => (
    <HeaderButton icon={icon} onPress={onPress} />
  );

  return (
    <NavigationContainer linking={linking} onReady={() => setNavigationReady(true)}>
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

        <Stack.Group navigationKey={isAuthenticated ? 'user' : 'anonymous'}>
          <Stack.Screen
            name={AppNavigation.JOIN_GROUP}
            component={JoinGroupScreen}
            options={({ navigation }) => ({
              title: t('joinGroup.title'),
              header: ScreenHeader,
              headerRight: () =>
                renderHeaderRight(X, () =>
                  navigation.popTo(isAuthenticated ? AppNavigation.MAIN : AppNavigation.LOGIN)
                ),
            })}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
