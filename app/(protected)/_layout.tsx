import { Redirect, Stack, useNavigation, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect } from "react";
import { IconButton } from "src/components/buttons/IconButton";
import { COLORS } from "src/config/colors";
import { useAppStore } from "src/store/store";

export default function ProtectedLayout() {
  const navigation = useNavigation();

  return (
    <Stack screenOptions={{
      title: '',
      headerTransparent: true,
      headerLeft: () => {
        return (
          <IconButton
            onPress={() => navigation.goBack()}
            Icon={ArrowLeft}
            iconColor={COLORS.gray800}
            fillColor={COLORS.white}
            borderColor={COLORS.border} />
        )
      }
    }}>
      <Stack.Screen name='create-group' options={{
        headerShown: false,
        presentation: 'modal'
      }} />
    </Stack>
  )
}