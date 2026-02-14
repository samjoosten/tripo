import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { Pressable, StyleSheet } from 'react-native';
import { FadeIn } from 'react-native-reanimated';

import { AppleSignIn } from 'features/apple-sign-in';
import { GoogleSignIn } from 'features/google-sign-in';
import { sv } from 'shared/lib/theme';
import type { RootStackParamList } from 'shared/routes';
import { AppNavigation } from 'shared/routes';
import Column from 'shared/ui/Column';
import Divider from 'shared/ui/Divider';
import { FilledButton } from 'shared/ui/FilledButton';
import { Form } from 'shared/ui/Form';
import { FormInput } from 'shared/ui/FormInput';
import { FormPasswordInput } from 'shared/ui/FormPasswordInput';
import { AnimatedScreenContent } from 'shared/ui/ScreenContent';
import { ThemedText } from 'shared/ui/ThemedText';

import type { LoginSchema } from '../model/useLoginSchema';
import { useLoginSchema } from '../model/useLoginSchema';

import { LoginHeader } from './LoginHeader';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, AppNavigation.LOGIN>;

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { t } = useTranslation();
  const loginSchema = useLoginSchema();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitLogin = (_: LoginSchema) => {};

  return (
    <AnimatedScreenContent entering={FadeIn} style={styles.container}>
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
            <FormPasswordInput
              label={t('login.labels.password')}
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
            />
          )}
        />
        <FilledButton text={t('login.buttons.login')} onPress={handleSubmit(onSubmitLogin)} />
        <Divider />
        <Column spacing='spacing.xs'>
          <AppleSignIn />
          <GoogleSignIn />
        </Column>
      </Form>
      <Pressable onPress={() => navigation.navigate(AppNavigation.REGISTER)}>
        <ThemedText type='body'>
          <Trans
            i18nKey={'login.buttons.register'}
            components={[<ThemedText type='body' lightColor='azure.500' darkColor='azure.500' />]}
          />
        </ThemedText>
      </Pressable>
    </AnimatedScreenContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: sv('spacing.lg'),
  },
});
