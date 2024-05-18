import { useMemo, useRef, useState } from "react";
import { Pressable, TextInput, View, type TextInputProps } from "react-native";
import { COLORS } from "src/config/colors";
// import SquircleView from "./SquircleView";
import { LabelText } from "./Text";
import type { LucideIcon } from "lucide-react-native";
import { sizing } from "src/config/theme";

interface Props extends TextInputProps {
  PreIcon?: LucideIcon;
  AfterIcon?: LucideIcon;
  label?: string;
  error?: string;
}

export const FormInput = (props: Props) => {
  const { onBlur, onFocus, ...rest } = props;
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const strokeColor = useMemo(() => {
    if (props.error) return COLORS.red500;
    if (isFocused) return COLORS.primary800;
    return COLORS.border;
  }, [isFocused, props.error]);

  return (
    <View className="flex-col gap-1">
      {props.label && <LabelText className="text-gray-400">{props.label}</LabelText>}
      <Pressable onPress={() => inputRef.current?.focus()}>
        <View className="flex-row items-center px-4 py-3.5" style={{
          borderWidth: 1,
          borderColor: strokeColor,
          borderRadius: 12,
          backgroundColor: COLORS.primary100
        }}>
          {props.PreIcon && <props.PreIcon size={sizing.ICON_SIZE_S} color={strokeColor} />}
          <TextInput
            ref={inputRef}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus && onFocus(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur && onBlur(e);
            }}
            className="flex-1 font-gilroy-medium"
            placeholderTextColor={COLORS.border}
            {...rest}
          />
          {props.AfterIcon && <props.AfterIcon size={sizing.ICON_SIZE_S} color={strokeColor} />}
        </View>
      </Pressable>
      {props.error && <LabelText className="text-red-500">{props.error}</LabelText>}
    </View>
  )
}