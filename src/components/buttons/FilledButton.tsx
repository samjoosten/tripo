import type { LucideIcon } from "lucide-react-native";
import { Text, TouchableOpacity, View, type TouchableOpacityProps } from "react-native";
import { MotiPressable, type MotiPressableProps } from "moti/interactions";
// import SquircleView from "src/components/SquircleView";
import LottieView from 'lottie-react-native';
import { sizing } from "src/config/theme";
import { COLORS } from "src/config/colors";
import { useMemo } from "react";

interface Props extends MotiPressableProps {
  fillColor?: string;
  loading?: boolean;
  label?: string;
  labelColor?: string;
  Icon?: LucideIcon;
  iconColor?: string;
  renderLoading?: () => JSX.Element | React.ReactNode;
  renderContent?: () => JSX.Element | React.ReactNode;
}

export const FilledButton = (props: Props) => {
  return (
    <MotiPressable {...props} animate={useMemo(
      () => ({ pressed }) => {
        'worklet'

        return {
          scale: pressed ? 0.97 : 1,
        }
      },
      []
    )} disabled={props.disabled || props.loading}>
      <View className="flex-row items-center justify-center" style={{ height: 60, backgroundColor: props.fillColor ?? COLORS.primary800, borderRadius: 12 }}>
        <FilledContent {...props} />
      </View>
    </MotiPressable>
  )
}

const FilledContent = (props: Props) => {
  if (!props.renderContent && !props.label) {
    throw new Error('Filled variant requires label or renderContent')
  }

  if (props.loading && !props.renderLoading) {
    return (
      <LottieView autoPlay style={{ height: 60 }} source={require('src/assets/animations/loading-dots.json')} />
    )
  }

  if (props.loading && props.renderLoading) {
    return props.renderLoading()
  }

  if (props.renderContent) {
    return props.renderContent()
  }
  return (
    <>
      <Text className="font-gilroy-semi-bold text-lg pr-1" style={{ color: props.labelColor ?? COLORS.white }}>{props.label}</Text>
      {props.Icon && <props.Icon size={sizing.ICON_SIZE_S} color={props.iconColor ?? COLORS.white} />}
    </>
  )
}