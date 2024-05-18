import { useQueryClient } from "@tanstack/react-query";
import { useNavigation, useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { TitleText } from "src/components/Text";
import { FilledButton } from "src/components/buttons/FilledButton";
import { TextButton } from "src/components/buttons/TextButton";
import { useApplicationUserQuery } from "src/hooks/queries/useApplicationUserQuery";
import { useAppStore } from "src/store/store";

export const GroupScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const clearTokens = useAppStore(state => state.clearTokens);

  const queryClient = useQueryClient();
  const { data: user, isFetching } = useApplicationUserQuery();
  
  const handleLogout = () => {
    clearTokens();
    queryClient.clear();
    router.replace('/(public)/login');
    navigation.reset({
      index: 0,
      routes: [{ name: '(public)' as never }],
    })
  };

  return (
    <View className="flex-col flex-1 justify-center">
      {isFetching && <ActivityIndicator/>}
      {user && <View className="flex-col items-center">
        <TitleText className="text-gray-900 mb-3">Welkom terug, {user.name}!</TitleText>
        <TextButton onPress={handleLogout} label="Uitloggen"/>
      </View>}
    </View>
  )
};