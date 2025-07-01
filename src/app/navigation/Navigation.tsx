import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import LoginScreen from 'screens/login/ui/LoginScreen';
import type { NavigationStackLists } from 'shared/routes';
import { AppNavigation } from 'shared/routes';

export const Stack = createNativeStackNavigator<NavigationStackLists>();

const Navigation = () => {
  return (
    <NavigationContainer onReady={() => SplashScreen.hideAsync()}>
      <Stack.Navigator initialRouteName={AppNavigation.LOGIN}>
        <Stack.Screen name={AppNavigation.LOGIN} component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;