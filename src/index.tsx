import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from 'app/navigation/Navigation';
import { InitProvider } from 'app/providers/InitProvider';
import { useCacheAssets } from 'app/providers/InitProvider/useCacheAssets';
import ThemeProvider from 'app/providers/ThemeProvider';
import { i18n } from 'shared/config';

import StorybookUI from '../.rnstorybook';

const isStorybook = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';

// Keep the splash screen visible while we fetch resources
void SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  fade: true,
});

if (isStorybook) {
  void SplashScreen.hideAsync();
}

const queryClient = new QueryClient();

const App = () => {
  useCacheAssets();

  if (isStorybook) {
    return <StorybookUI />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <InitProvider>
              <ThemeProvider>
                <Navigation />
              </ThemeProvider>
            </InitProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </I18nextProvider>
  );
};

export default App;
