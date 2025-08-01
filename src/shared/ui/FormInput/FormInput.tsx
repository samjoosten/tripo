import { useEffect } from 'react';
import type { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from 'react-native';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Animated, { LinearTransition, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';

import { cv, sv } from 'shared/lib/theme';

import { RoundedView } from '../RoundedView/RoundedView';
import { AnimatedIcon, type IconSvgObject } from '../ThemedIcon';
import { AnimatedThemedText, ThemedText } from '../ThemedText';

type Props = {
  showFocus?: boolean;
  error?: string;
  label?: string;
  trailingIcon?: IconSvgObject;
  onTrailingIconPress?: () => void;
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

    color.value = withTiming(cv('azure.400'), { duration: 200 });
    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (!showFocus) return;

    color.value = withTiming(cv('powderBlue.200'), { duration: 200 });
    onBlur?.(e);
  };

  const animatedProps = useAnimatedProps(() => {
    return { color: color.value };
  });

  return (
    <Animated.View layout={LinearTransition} style={styles.container}>
      {!!label && (
        <AnimatedThemedText type='secondary' color={color}>
          {label}
        </AnimatedThemedText>
      )}
      <RoundedView style={[styles.inputContainer]} borderWidth={2} borderColor={color}>
        <TextInput
          cursorColor={cv('azure.500')}
          selectionColor={cv('azure.500')}
          placeholderTextColor={cv('powderBlue.200')}
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
          <ThemedText type='secondary' color='red.400'>
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
    borderColor: cv('powderBlue.200'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cv('white'),
    columnGap: sv('spacing.xs'),
    marginTop: sv('spacing.xs'),
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
