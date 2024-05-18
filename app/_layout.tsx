import { ThemeProvider as NavProvider } from '@react-navigation/native'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { Slot, useNavigation, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Snackbar from 'src/components/snackbar/Snackbar'
import SnackbarProvider from 'src/components/snackbar/SnackbarProvider'
import { navTheme } from 'src/config/theme'
import { useAppStore } from 'src/store/store'

const queryClient = new QueryClient();

export default function AppLayout() {
  useAuthHandler();
  
  return (
    <GestureHandlerRootView>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <Snackbar />
          <StatusBar style="light" />
          <NavProvider value={navTheme}>
            <Slot />
          </NavProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </GestureHandlerRootView>
  )
}

const useAuthHandler = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const segments = useSegments();
  const token = useAppStore(state => state.token);

  useEffect(() => {
    const inProtectedGroup = segments[0] === '(protected)'
    if (token.isLoggedIn && !inProtectedGroup) {
      const route = !token.groupId ? '/no-group' : '/my-group';
      router.replace(route);
    } else if (!token.isLoggedIn) {
      router.replace('/login')
      navigation.reset({
        index: 0,
        routes: [{ name: '(public)' as never }],
      })
    }
  }, [navigation, token])
}