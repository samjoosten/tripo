import { Stack } from "expo-router";
import ScreenLayout from "src/components/ScreenLayout";
import { CreateGroupScreen } from "src/features/group/create/CreateGroupScreen";

export default function CreateGroupRoute() {
  return (
    <ScreenLayout>
      <CreateGroupScreen />
    </ScreenLayout>
  )
}