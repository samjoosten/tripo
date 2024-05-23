import { Search } from "lucide-react-native";
import { useRef } from "react";
import { View, type TextInputProps, Pressable, TextInput } from "react-native";
import { COLORS } from "src/config/colors";
import { sizing } from "src/config/theme";
import LottieView from 'lottie-react-native';

export interface SearchInputProps extends TextInputProps {
  loading?: boolean;
}

export const SearchInput = (props: SearchInputProps) => {
  const inputRef = useRef<TextInput>(null);
  return (
    <Pressable onPress={() => inputRef.current?.focus()}>
      <View className="flex-row items-center rounded-full border-solid p-3" style={{ borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.primary100 }}>
        <Search size={sizing.ICON_SIZE_S} color={COLORS.border} className="mr-3" />
        <TextInput
          style={{ flex: 1 }}
          ref={inputRef}
          className="flex-1 font-gilroy-medium"
          placeholderTextColor={COLORS.border}
          {...props}
        />
        {
          props.loading && (
            <View style={{ width: 30, right: 0, marginRight: 10, position: 'absolute' }}>
              <LottieView autoPlay style={{ width: 30, height: 30 }} source={require('src/assets/animations/loading-dots-color-border.json')} />
            </View>
          )
        }
      </View>
    </Pressable>
  )
}