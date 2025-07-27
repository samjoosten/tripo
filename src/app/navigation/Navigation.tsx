import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import { LoginScreen, RegistrationScreen } from 'screens';
import type { NavigationStackLists } from 'shared/routes';
import { AppNavigation } from 'shared/routes';

import { TabNavigation } from './TabNavigation';

export const Stack = createNativeStackNavigator<NavigationStackLists>();

const Navigation = () => {
  return (
    <NavigationContainer onReady={() => SplashScreen.hideAsync()}>
      <Stack.Navigator initialRouteName={AppNavigation.LOGIN}>
        <Stack.Screen name={AppNavigation.LOGIN} component={LoginScreen} />
        <Stack.Screen name={AppNavigation.REGISTER} component={RegistrationScreen} />
        {/* <Stack.Screen name={AppNavigation.MAIN} options={{ headerShown: false }} component={TabNavigation} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
