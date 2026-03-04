import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
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
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { AnimatedScreenContent } from 'shared/ui/ScreenContent';
import { ThemedText } from 'shared/ui/ThemedText';
import { showErrorAlert } from 'shared/ui/Alert';

import type { LoginSchema } from '../model/useLoginSchema';
import { useLoginSchema } from '../model/useLoginSchema';
import { useEmailLoginMutation } from '../api/useEmailLoginMutation';

import { LoginHeader } from './LoginHeader';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, AppNavigation.LOGIN>;

export const LoginScreen = ({ navigation, route }: LoginScreenProps) => {
  const joinGroupId = route.params?.joinGroupId;
  const { t } = useTranslation();
  const { mutateAsync: emailLogin, isPending: isLoginPending } = useEmailLoginMutation();

  const loginSchema = useLoginSchema();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitLogin = async (data: LoginSchema) => {
    try {
      await emailLogin({ ...data, joinGroupId });
    } catch {
      showErrorAlert({
        message: t('login.emailLoginError'),
      });
    }
  };

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
              autoCapitalize='none'
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
        <FilledButton text={t('login.buttons.login')} onPress={handleSubmit(onSubmitLogin)} loading={isLoginPending} />
        <Divider />
        <Column spacing='spacing.xs'>
          <AppleSignIn />
          <GoogleSignIn />
        </Column>
      </Form>
      <PressableOpacity onPress={() => navigation.navigate(AppNavigation.REGISTER, { joinGroupId })}>
        <ThemedText type='body'>
          <Trans
            i18nKey={'login.buttons.register'}
            components={[<ThemedText type='button' lightColor='azure.500' darkColor='azure.500' />]}
          />
        </ThemedText>
      </PressableOpacity>
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
