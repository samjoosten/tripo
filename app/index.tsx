import { Stack, useNavigation, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import ScreenLayout from 'src/components/ScreenLayout';
import { useAppStore } from 'src/store/store';

export default function AppRoute() {
  return (
    <ScreenLayout className='justify-center'>
      <Stack.Screen options={{ headerShown: false }} />
      <ActivityIndicator size='large' />
    </ScreenLayout>
  );
}