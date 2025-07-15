import { useEffect, useState } from 'react';
import type { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from 'react-native';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { cv, sv } from 'shared/lib/theme';

import { ThemedIcon, type IconSvgObject } from '../ThemedIcon';
import { AnimatedThemedText, ThemedText } from '../ThemedText';

type Props = {
  showFocus?: boolean;
  error?: string;
  label?: string;
  trailingIcon?: IconSvgObject;
  onTrailingIconPress?: () => void;
} & TextInputProps;

export const FormInput = ({
  showFocus,
  label,
  error,
  trailingIcon,
  onFocus,
  onBlur,
  onTrailingIconPress,
  ...rest
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const color = useSharedValue(cv('powderBlue.200'));

  useEffect(() => {
    if (error) {
      color.value = withTiming(cv('red.400'), { duration: 200 });
    } else {
      color.value = withTiming(cv('powderBlue.200'), { duration: 200 });
    }
  }, [error]);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (!showFocus) return;

    setIsFocused(true);
    color.value = withTiming(cv('azure.400'), { duration: 200 });
    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (!showFocus) return;

    setIsFocused(false);
    color.value = withTiming(cv('powderBlue.200'), { duration: 200 });
    onBlur?.(e);
  };

  const getIconColor = () => {
    if (error) return cv('red.400');
    if (isFocused) return cv('azure.400');
    return cv('powderBlue.200');
  };

  const aContainerStyle = useAnimatedStyle(() => ({
    borderColor: color.value,
  }));

  return (
    <Animated.View style={styles.container} layout={LinearTransition}>
      {!!label && (
        <AnimatedThemedText type='secondary' color={color}>
          {label}
        </AnimatedThemedText>
      )}
      <Animated.View style={[styles.inputContainer, aContainerStyle]}>
        <TextInput
          cursorColor={cv('azure.500')}
          selectionColor={cv('azure.500')}
          placeholderTextColor={cv('powderBlue.200')}
          style={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {!!trailingIcon && (
          <Pressable onPress={onTrailingIconPress} hitSlop={sv('spacing.sm')} style={styles.icon}>
            <ThemedIcon icon={trailingIcon} color={getIconColor()} />
          </Pressable>
        )}
      </Animated.View>
      {!!error && (
        <ThemedText type='secondary' color='red.400'>
          {error}
        </ThemedText>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: sv('spacing.xs'),
  },
  inputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: cv('powderBlue.200'),
    borderCurve: 'continuous',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cv('white'),
    columnGap: sv('spacing.xs'),
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
