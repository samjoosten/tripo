import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

import Navigation from 'app/navigation/Navigation';
import { InitProvider } from 'app/providers/init-provider';
import { useCacheAssets } from 'app/providers/init-provider/use-cache-assets';

// Keep the splash screen visible while we fetch resources
void SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  fade: true,
});

if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  void SplashScreen.hideAsync();
}
const App = () => {
  useCacheAssets();

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <InitProvider>
          <Navigation />
        </InitProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  AppEntryPoint = require('../.rnstorybook').default;
}

export default AppEntryPoint;
