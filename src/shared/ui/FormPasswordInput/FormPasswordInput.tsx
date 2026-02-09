import { ViewIcon, ViewOffIcon } from '@hugeicons-pro/core-stroke-rounded';
import { useState } from 'react';
import type { BlurEvent, TextInputProps } from 'react-native';
import { StyleSheet } from 'react-native';

import { sv } from 'shared/lib/theme';

import { FormInput } from '../FormInput';

type Props = {
  showFocus?: boolean;
  error?: string;
  label?: string;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: BlurEvent) => void;
} & TextInputProps;

export const FormPasswordInput = (props: Props) => {
  const { label, value, onChangeText, error, ...rest } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <FormInput
      label={label}
      value={value}
      secureTextEntry={!passwordVisible}
      style={!passwordVisible && styles.passwordSecure}
      onChangeText={onChangeText}
      error={error}
      trailingIcon={passwordVisible ? ViewOffIcon : ViewIcon}
      onTrailingIconPress={togglePasswordVisibility}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  passwordSecure: {
    fontFamily: '',
    fontSize: sv('text.sm'),
  },
});
