import { useEffect } from 'react';
import type { FocusEvent, TextInputProps, BlurEvent } from 'react-native';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Animated, { LinearTransition, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';

import { cv, sv, useThemeConfigColor } from 'shared/lib/theme';

import { RoundedView } from '../RoundedView/RoundedView';
import { AnimatedIcon, type IconSvgObject } from '../ThemedIcon';
import { AnimatedThemedText, ThemedText } from '../ThemedText';

const INPUT_HEIGHT = 45;

type Props = {
  showFocus?: boolean;
  error?: string;
  label?: string;
  trailingIcon?: IconSvgObject;
  onTrailingIconPress?: () => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: BlurEvent) => void;
} & TextInputProps;

export const FormInput = ({
  showFocus = true,
  label,
  error,
  trailingIcon,
  onFocus,
  onBlur,
  onTrailingIconPress,
  style,
  ...rest
}: Props) => {
  const backgroundColor = useThemeConfigColor('input');
  const defaultColor = useThemeConfigColor('input.border');
  const focusedColor = useThemeConfigColor('input.border:focused');
  const placeholderTextColor = useThemeConfigColor('input.placeholder');
  const errorColor = useThemeConfigColor('input.border:error');
  const colorSv = useSharedValue(defaultColor);

  useEffect(() => {
    if (error) {
      colorSv.value = withTiming(errorColor, { duration: 200 });
    } else {
      colorSv.value = withTiming(defaultColor, { duration: 200 });
    }
  }, [error, errorColor, defaultColor]);

  const handleFocus = (e: FocusEvent) => {
    if (!showFocus) return;

    colorSv.value = withTiming(focusedColor, { duration: 200 });
    onFocus?.(e);
  };

  const handleBlur = (e: BlurEvent) => {
    if (!showFocus) return;

    colorSv.value = withTiming(defaultColor, { duration: 200 });
    onBlur?.(e);
  };

  const animatedProps = useAnimatedProps(() => {
    return { color: colorSv.value };
  });

  return (
    <Animated.View layout={LinearTransition} style={styles.container}>
      {!!label && (
        <AnimatedThemedText type='secondary' color={colorSv}>
          {label}
        </AnimatedThemedText>
      )}
      <RoundedView style={[styles.inputContainer, { backgroundColor }]} borderWidth={2} borderColor={colorSv}>
        <TextInput
          cursorColor={cv('azure.500')}
          selectionColor={cv('azure.500')}
          placeholderTextColor={placeholderTextColor}
          style={[styles.input, style]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {!!trailingIcon && (
          <Pressable onPress={onTrailingIconPress} hitSlop={sv('spacing.sm')} style={styles.icon}>
            <AnimatedIcon icon={trailingIcon} animatedProps={animatedProps} />
          </Pressable>
        )}
      </RoundedView>
      {!!error && (
        <View style={{ marginTop: sv('spacing.xs') }}>
          <ThemedText type='secondary' lightColor='red.400' darkColor='red.400'>
            {error}
          </ThemedText>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    width: '100%',
  },
  inputContainer: {
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: sv('spacing.xs'),
    marginTop: sv('spacing.xs'),
    height: INPUT_HEIGHT,
  },
  input: {
    flexGrow: 1,
    padding: sv('spacing.sm'),
    fontFamily: 'Gilroy-Regular',
    fontSize: sv('text.m'),
    color: cv('gray.900'),
  },
  icon: {
    padding: sv('spacing.sm'),
  },
});
