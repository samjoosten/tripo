import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

import { sv } from 'shared/lib/theme';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { Form } from 'shared/ui/Form';
import { FormInput } from 'shared/ui/FormInput';
import { FilledButton } from 'shared/ui/FilledButton';

import type { LoginSchema } from '../model/loginSchema';
import { loginSchema } from '../model/loginSchema';

import { LoginHeader } from './LoginHeader';

export const LoginScreen = () => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitLogin = (data: LoginSchema) => {
    console.log('Form submitted with data:', data);
  };

  const onError = (error: any) => {
    console.error('Form submission error:', error);
  };

  return (
    <ScreenContent style={styles.container}>
      <LoginHeader />
      <Form>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value } }) => (
            <FormInput label={t('login.labels.email')} value={value} onChangeText={onChange} />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, value } }) => (
            <FormInput label={t('login.labels.password')} value={value} secureTextEntry onChangeText={onChange} />
          )}
        />
        <FilledButton text={t('login.buttons.login')} onPress={handleSubmit(onSubmitLogin, onError)} />
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
});
