import { ActivityIndicator, TouchableOpacity, View, type TouchableOpacityProps } from "react-native"
import { COLORS } from "src/config/colors"
// import SquircleView from "../SquircleView"
import type { LucideIcon } from "lucide-react-native";
import { sizing } from "src/config/theme";

interface Props extends TouchableOpacityProps {
  loading?: boolean;
  fillColor?: string;
  borderColor?: string;
  Icon?: LucideIcon;
  iconColor?: string;
  iconSize?: number;
  renderLoading?: () => JSX.Element | React.ReactNode;
  renderContent?: () => JSX.Element | React.ReactNode;
}

export const IconButton = (props: Props) => {
  if (props.borderColor || props.fillColor) {
    return (
      <TouchableOpacity {...props}>
        <View className="flex-row items-center px-2.5 py-2.5" style={{
          borderRadius: 12,
          backgroundColor: props.fillColor,
          borderColor: props.borderColor ?? COLORS.border,
          borderWidth: 1,
          borderCurve: 'continuous'
        }}>
          <IconContent {...props} />
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <TouchableOpacity {...props}>
      <IconContent {...props} />
    </TouchableOpacity>
  )
}

const IconContent = (props: Props) => {
  if (!props.renderContent && !props.Icon) {
    throw new Error('Icon variant requires Icon or renderContent')
  }

  if (props.loading && !props.renderLoading) {
    return (
      <ActivityIndicator color={COLORS.white} />
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
      {props.Icon && <props.Icon size={props.iconSize} color={props.iconColor ?? COLORS.primary800} />}
    </>
  )
}