import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { I18nextProvider } from 'react-i18next';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';

import Navigation from 'app/navigation/Navigation';
import { InitProvider } from 'app/providers/InitProvider';
import { useCacheAssets } from 'app/providers/InitProvider/useCacheAssets';
import { i18n } from 'shared/config';
import ThemeProvider from 'app/providers/ThemeProvider';

// Keep the splash screen visible while we fetch resources
void SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  fade: true,
});

if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  void SplashScreen.hideAsync();
}

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL as string);

const App = () => {
  useCacheAssets();

  return (
    <I18nextProvider i18n={i18n}>
      <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <GestureHandlerRootView>
            <SafeAreaProvider>
              <InitProvider>
                <ThemeProvider>
                  <Navigation />
                </ThemeProvider>
              </InitProvider>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </I18nextProvider>
  );
};

let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled === 'true') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  AppEntryPoint = require('../.rnstorybook').default;
}

export default AppEntryPoint;
