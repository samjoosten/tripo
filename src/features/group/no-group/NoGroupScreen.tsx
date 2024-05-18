import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { View } from "react-native";
import { BodyText, H2Text } from "src/components/Text";
import { FilledButton } from "src/components/buttons/FilledButton";

export const NoGroupScreen = () => {
  const router = useRouter();
  return (
    <View className="flex-col flex-1 justify-center gap-5">
      <View>
        <H2Text>Geen groep</H2Text>
        <BodyText>Maak een groep aan om challenges te doen.</BodyText>
      </View>
      <FilledButton Icon={Plus} label="Groep aanmaken" onPress={() => router.push('/create-group')}/>
    </View>
  )
}