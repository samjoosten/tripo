import { Stack, useRouter } from "expo-router";
import { User } from "lucide-react-native";
import ScreenLayout from "src/components/ScreenLayout";
import { IconButton } from "src/components/buttons/IconButton";
import { COLORS } from "src/config/colors";
import { NoGroupScreen } from "src/features/group/no-group/NoGroupScreen";

export default function NoGroupRoute() {
  const router = useRouter();
  return (
    <ScreenLayout>
      <Stack.Screen options={{
        headerShown: true,
        headerTransparent: true,
        headerLeft: () => null,
        headerRight: () => {
          return (
            <IconButton
              onPress={() => router.push('/my-group')}
              Icon={User}
              iconColor={COLORS.gray800}
              fillColor={COLORS.white}
              borderColor={COLORS.border} />
          )
        }
      }} />
      <NoGroupScreen />
    </ScreenLayout>
  )
}