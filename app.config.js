module.exports = {
  "name": "Tripo",
  "slug": "tripo",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/icon.png",
  "userInterfaceStyle": "automatic",
  "newArchEnabled": true,
  "scheme": "tripo",
  "ios": {
    "supportsTablet": true,
    "bundleIdentifier": "com.samjoosten.tripo"
  },
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png",
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
    "react-native-edge-to-edge",
    "expo-localization",
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
