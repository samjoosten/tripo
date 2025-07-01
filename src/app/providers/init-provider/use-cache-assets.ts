/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useFonts } from 'expo-font';

/**
 * Use Cache Assets Before Render
 * -
 */
export const useCacheAssets = () => {
  const [fontsLoaded] = useFonts({
    'Gilroy-Medium': require('../../../../assets/fonts/Gilroy-Medium.ttf'),
    'Gilroy-SemiBold': require('../../../../assets/fonts/Gilroy-SemiBold.ttf'),
    'Gilroy-Light': require('../../../../assets/fonts/Gilroy-Light.ttf'),
    'Gilroy-Regular': require('../../../../assets/fonts/Gilroy-Regular.ttf'),
    'ArchitectsDaughter-Regular': require('../../../../assets/fonts/ArchitectsDaughter-Regular.ttf'),
  });
  return fontsLoaded;
};