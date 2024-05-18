import { useFonts } from 'expo-font'

/**
 * Use Cache Assets Before Render
 * -
 */
export default function useCacheAssets() {
  const [fontsLoaded] = useFonts({ 
    'Gilroy-Medium': require('src/assets/fonts/Gilroy-Medium.ttf'),
    'Gilroy-SemiBold': require('src/assets/fonts/Gilroy-SemiBold.ttf'),
    'Gilroy-Light': require('src/assets/fonts/Gilroy-Light.ttf'),
    'Gilroy-Regular': require('src/assets/fonts/Gilroy-Regular.ttf'),
    'ArchitectsDaughter-Regular': require('src/assets/fonts/ArchitectsDaughter-Regular.ttf'),
   })
  return fontsLoaded
}