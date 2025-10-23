import { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import type { ColorPaletteType } from 'shared/lib/theme';
import { cv, useThemeColor } from 'shared/lib/theme';
import { LoadingSpinner } from 'shared/ui/LoadingSpinner';
import { ThemedIcon, type IconSvgObject } from 'shared/ui/ThemedIcon';
import { ThemedText } from 'shared/ui/ThemedText';

import { RoundedView } from '../RoundedView/RoundedView';

import { styles } from './FilledButtonStyle';
import { getButtonGradient } from './getButtonGradient';

type Props = {
  text?: string;
  disabled?: boolean;
  loading?: boolean;
  autowidth?: boolean;
  leadingIcon?: IconSvgObject;
  trailingIcon?: IconSvgObject;
  lightColor?: ColorPaletteType;
  darkColor?: ColorPaletteType;
  children?: React.ReactNode;
  borderWidth?: number;
  lightBorderColor?: ColorPaletteType;
  darkBorderColor?: ColorPaletteType;
  onPress?: () => void;
};

export const FilledButton = ({
  text,
  disabled,
  loading,
  autowidth,
  leadingIcon,
  trailingIcon,
  lightColor,
  darkColor,
  borderWidth,
  lightBorderColor,
  darkBorderColor,
  children,
  onPress,
}: Props) => {
  const isDisabled = disabled || loading;
  const colorValue = useThemeColor('buttonGradient1', { light: lightColor, dark: darkColor });
  const defaultGradientColors = [useThemeColor('buttonGradient1'), useThemeColor('buttonGradient2')];
  const disabledColor = useThemeColor('button:disabled');
  const borderColorValue = useThemeColor('button.border', {
    light: lightBorderColor,
    dark: darkBorderColor,
  });
  const firstColor = useSharedValue(defaultGradientColors[0]);
  const secondColor = useSharedValue(defaultGradientColors[1]);
  const colors = useDerivedValue(() => [firstColor.value, secondColor.value]);
  const buttonScale = useSharedValue(1);

  const loaderOpacity = useSharedValue(0);

  useEffect(() => {
    if (loading) {
      loaderOpacity.value = withTiming(1, { duration: 300 });
    } else {
      loaderOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [loading]);

  useEffect(() => {
    if (isDisabled) {
      firstColor.value = withTiming(disabledColor, { duration: 300 });
      secondColor.value = withTiming(disabledColor, { duration: 300 });
    } else {
      firstColor.value = withTiming(defaultGradientColors[0], { duration: 300 });
      secondColor.value = withTiming(defaultGradientColors[1], { duration: 300 });
    }
  }, [isDisabled]);

  const aLoaderStyle = useAnimatedStyle(() => {
    return {
      opacity: loaderOpacity.value,
    };
  });

  const aContentStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(loaderOpacity.value, [0, 1], [1, 0]),
    };
  });

  const aButtonContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const onPressIn = () => {
    if (isDisabled) return;
    buttonScale.value = withTiming(0.97, { duration: 200, easing: Easing.inOut(Easing.ease) });
  };

  const onPressOut = () => {
    if (isDisabled) return;
    buttonScale.value = withTiming(1, { duration: 200, easing: Easing.inOut(Easing.ease) });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={isDisabled}
      style={[!autowidth ? { width: '100%' } : {}]}>
      <Animated.View style={[aButtonContainerStyle, !autowidth ? { width: '100%', padding: 2 } : {}]}>
        <RoundedView
          style={[styles.container, colorValue ? { backgroundColor: colorValue } : {}]}
          borderColor={borderColorValue ?? colorValue ?? firstColor}
          borderWidth={borderWidth ?? 2}
          gradientColors={getButtonGradient(lightColor, darkColor, colors)}>
          {!!loading && (
            <Animated.View style={[aLoaderStyle, { position: 'absolute' }]}>
              <LoadingSpinner />
            </Animated.View>
          )}
          <Animated.View style={[aContentStyle, styles.content]}>
            {children ?? (
              <>
                {!!leadingIcon && <ThemedIcon icon={leadingIcon} color={cv('white')} />}
                <ThemedText type='button'>{text}</ThemedText>
                {!!trailingIcon && <ThemedIcon icon={trailingIcon} color={cv('white')} />}
              </>
            )}
          </Animated.View>
        </RoundedView>
      </Animated.View>
    </Pressable>
  );
};
