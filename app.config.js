module.exports = {
  "name": process.env.EXPO_PUBLIC_PROFILE === "production" ? "Tripo" : "Tripo Dev",
  "slug": process.env.EXPO_PUBLIC_PROFILE === "production" ? "tripo" : "tripo-dev",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": process.env.EXPO_PUBLIC_PROFILE === "production" ? "./assets/icon.png" : "./assets/icon-dev.png",
  "userInterfaceStyle": "automatic",
  "newArchEnabled": true,
  "scheme": process.env.EXPO_PUBLIC_PROFILE === "production" ? "tripo" : "tripo-dev",
  "ios": {
    "usesAppleSignIn": true,
    "supportsTablet": true,
    "bundleIdentifier": "com.samjoosten.tripo"
  },
  "android": {
    "adaptiveIcon": {
      "foregroundImage": process.env.EXPO_PUBLIC_PROFILE === "production" ? "./assets/adaptive-icon.png" : "./assets/adaptive-icon-dev.png",
      "backgroundColor": "#0B6CFE"
    },
    "package": "com.samjoosten.tripo" 
  },
  "extra": {
    "storybookEnabled": process.env.STORYBOOK_ENABLED,
  },
  "plugins": [
    "expo-asset",
    [
      "expo-splash-screen",
      {
        "backgroundColor": "#0B6CFE",
        "image": "./assets/splash-icon.png"
      }
    ],
    "expo-apple-authentication",
    "react-native-edge-to-edge",
    "expo-localization",
    "expo-secure-store",
    ["expo-font", {
      'fonts': [
        './assets/fonts/Gilroy-Medium.ttf',
        './assets/fonts/Gilroy-SemiBold.ttf',
        './assets/fonts/Gilroy-Light.ttf',
        './assets/fonts/Gilroy-Regular.ttf',
        './assets/fonts/ArchitectsDaughter-Regular.ttf'
      ]
    }]
  ]
}
