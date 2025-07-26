import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import LoginScreen from 'screens/login/ui/LoginScreen';
import type { NavigationStackLists } from 'shared/routes';
import { AppNavigation } from 'shared/routes';

import { TabNavigation } from './TabNavigation';

export const Stack = createNativeStackNavigator<NavigationStackLists>();

const Navigation = () => {
  return (
    <NavigationContainer onReady={() => SplashScreen.hideAsync()}>
      <Stack.Navigator initialRouteName={AppNavigation.MAIN}>
        {/* <Stack.Screen name={AppNavigation.MAIN} component={LoginScreen} /> */}
        <Stack.Screen name={AppNavigation.MAIN} options={{ headerShown: false }} component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
