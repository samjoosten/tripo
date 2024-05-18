import { Stack } from "expo-router";
import ScreenLayout from "src/components/ScreenLayout";
import { LoginScreen } from "src/features/login/LoginScreen";

export default function LoginRoute() {
  return (
    <ScreenLayout className='justify-center'>
      <Stack.Screen options={{
        headerShown: false
      }} />
      <LoginScreen />
    </ScreenLayout>
  );
}