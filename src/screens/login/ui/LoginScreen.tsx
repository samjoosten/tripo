import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@hugeicons-pro/core-stroke-rounded';

import { sv } from 'shared/lib/theme';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { Form } from 'shared/ui/Form';
import { FormInput } from 'shared/ui/FormInput';
import { FilledButton } from 'shared/ui/FilledButton';

import type { LoginSchema } from '../model/useLoginSchema';
import { useLoginSchema } from '../model/useLoginSchema';

import { LoginHeader } from './LoginHeader';

export const LoginScreen = () => {
  const { t } = useTranslation();
  const loginSchema = useLoginSchema();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const onSubmitLogin = (data: LoginSchema) => {
    console.log('Form submitted with data:', data);
  };

  return (
    <ScreenContent style={styles.container}>
      <LoginHeader />
      <Form>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <FormInput
              label={t('login.labels.email')}
              value={value}
              keyboardType='email-address'
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <FormInput
              label={t('login.labels.password')}
              value={value}
              secureTextEntry={!passwordVisible}
              style={!passwordVisible && styles.passwordSecure}
              onChangeText={onChange}
              error={errors.password?.message}
              trailingIcon={passwordVisible ? ViewOffIcon : ViewIcon}
              onTrailingIconPress={togglePasswordVisibility}
            />
          )}
        />
        <FilledButton text={t('login.buttons.login')} onPress={handleSubmit(onSubmitLogin)} />
      </Form>
    </ScreenContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: sv('spacing.m'),
  },
  passwordSecure: {
    fontFamily: '',
    fontSize: sv('text.sm'),
  },
});
