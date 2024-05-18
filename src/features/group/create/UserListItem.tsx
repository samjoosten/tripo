import { CheckCircle2, Plus } from "lucide-react-native";
import { View } from "react-native"
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import SquircleView from "src/components/SquircleView";
import { BodyText } from "src/components/Text"
import { IconButton } from "src/components/buttons/IconButton";
import { COLORS } from "src/config/colors";
import { sizing } from "src/config/theme";
import type { UserSearchResult } from "./queries";

const ITEM_HEIGHT = 60;

type Props = {
  user: UserSearchResult;
  index: number;
  scrollY: Animated.SharedValue<number>;
  isSelected?: boolean;
  onPress?: (id: UserSearchResult) => void;
}

export const UserListItem = (props: Props) => {
  const { index, scrollY, isSelected, user } = props;
  const style = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [-1, 0, ITEM_HEIGHT * index, ITEM_HEIGHT * (index + 2)], [1, 1, 1, 0]);
    return {
      transform: [{ scale }]
    }
  })
  return (
    <Animated.View style={style}>
      <SquircleView squircleParams={{
        cornerRadius: 10,
        cornerSmoothing: 1,
        fillColor: COLORS.white,
        strokeColor: isSelected ? COLORS.primary800 : COLORS.border,
        strokeWidth: 1,
      }} className="p-3.5 mb-3 flex-row justify-between items-center">
        <BodyText>{user.name}</BodyText>
        <IconButton
          Icon={isSelected ? CheckCircle2 : Plus}
          iconSize={sizing.ICON_SIZE_S}
          iconColor={isSelected ? COLORS.primary800 : COLORS.gray400}
          onPress={() => props.onPress?.(user)}
        />
      </SquircleView>
    </Animated.View>
  )
}