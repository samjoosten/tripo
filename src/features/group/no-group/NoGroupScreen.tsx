import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { View } from "react-native";
import { BodyText, H2Text } from "src/components/Text";
import { FilledButton } from "src/components/buttons/FilledButton";
import { useAppStore } from "src/store/store";

export const NoGroupScreen = () => {
  const router = useRouter();
  const token = useAppStore(state => state.token);
  return (
    <View className="flex-col flex-1 justify-center gap-5">
      {
        token.inviteGroupName && (
          <View>
            <H2Text>Uitnodiging</H2Text>
            <BodyText>Je hebt een uitnodiging van {token.inviteGroupName}.</BodyText>
          </View>
        )
      }
      <View>
        <H2Text>Geen groep</H2Text>
        <BodyText>Maak een groep aan om challenges te doen.</BodyText>
      </View>
      <FilledButton Icon={Plus} label="Groep aanmaken" onPress={() => router.push('/create-group')}/>
    </View>
  )
}