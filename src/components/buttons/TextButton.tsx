import { Link } from "expo-router";
import type { LinkProps } from "expo-router/build/link/Link";
import type { LucideIcon } from "lucide-react-native";
import { TouchableOpacity, Text, type TouchableOpacityProps } from "react-native"
import { COLORS } from "src/config/colors"
import { sizing } from "src/config/theme";

interface TextButtonProps extends TouchableOpacityProps {
  label: string;
  labelColor?: string;
  iconColor?: string;
  PreIcon?: LucideIcon;
  AfterIcon?: LucideIcon;
}

interface LinkButtonProps extends LinkProps {
  label: string;
  href: string;
  labelColor?: string;
  iconColor?: string;
  PreIcon?: LucideIcon;
  AfterIcon?: LucideIcon;
}

type Props = TextButtonProps | LinkButtonProps;

export const TextButton = (props: Props) => {
  if ('href' in props) {
    return (
      <Link {...props}>
        {props.PreIcon && <props.PreIcon size={sizing.ICON_SIZE_M} color={props.iconColor ?? COLORS.primary800} />}
        <Text className={'font-gilroy-semi-bold ' + props.className} style={{ color: props.labelColor ?? COLORS.primary800 }}>{props.label}</Text>
        {props.AfterIcon && <props.AfterIcon size={sizing.ICON_SIZE_M} color={props.iconColor ?? COLORS.primary800} />}
      </Link>
    )
  }
  return (
    <TouchableOpacity {...props}>
      {props.PreIcon && <props.PreIcon size={sizing.ICON_SIZE_M} color={props.iconColor ?? COLORS.primary800} />}
      <Text className={'font-gilroy-semi-bold ' + props.className} style={{ color: props.labelColor ?? COLORS.primary800 }}>{props.label}</Text>
      {props.AfterIcon && <props.AfterIcon size={sizing.ICON_SIZE_M} color={props.iconColor ?? COLORS.primary800} />}
    </TouchableOpacity>
  )
}