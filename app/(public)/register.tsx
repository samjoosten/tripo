import { Stack, useNavigation } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import ScreenLayout from "src/components/ScreenLayout";
import { IconButton } from "src/components/buttons/IconButton";
import { COLORS } from "src/config/colors";
import { RegisterScreen } from "src/features/register/RegisterScreen";

export default function RegisterRoute() {
  const navigation = useNavigation();
  return (
    <ScreenLayout className="justify-center">
      <Stack.Screen options={{
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
      }} />
      <RegisterScreen />
    </ScreenLayout>
  )
}