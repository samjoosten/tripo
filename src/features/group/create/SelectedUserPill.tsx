import { X } from "lucide-react-native";
import { Text, View } from "react-native";
import { BodyText, LabelText } from "src/components/Text";
import { IconButton } from "src/components/buttons/IconButton";
import { COLORS } from "src/config/colors";

type Props = {
  name: string;
  id: string;
  onRemove?: (id: string) => void;
}

export const SelectedUserPill = ({name, id, onRemove}: Props) => {
  return (
    <View className="flex-row justify-center items-center rounded-full px-4 py-2 mr-2" style={{ backgroundColor: COLORS.primary200 }}>
      <LabelText className="mr-2" style={{ color: COLORS.primary800 }}>{name}</LabelText>
      {onRemove && <IconButton Icon={X} iconSize={16} onPress={() => onRemove?.(id)} iconColor={COLORS.primary800} />}
    </View>
  )
}