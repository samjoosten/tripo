import { Stack } from "expo-router";
import ScreenLayout from "src/components/ScreenLayout";
import { GroupScreen } from "src/features/group/GroupScreen";

export default function MyGroupRoute() {
  return (
    <ScreenLayout>
      <Stack.Screen
        options={{
          headerShown: false
        }} />
      <GroupScreen />
    </ScreenLayout>
  )
}