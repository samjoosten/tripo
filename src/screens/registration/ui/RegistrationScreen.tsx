import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { RootStackParamList } from 'shared/routes';
import type { AppNavigation } from 'shared/routes';
import { Form } from 'shared/ui/Form';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { FormInput } from 'shared/ui/FormInput';
import { FormPasswordInput } from 'shared/ui/FormPasswordInput';
import { FilledButton } from 'shared/ui/FilledButton';
import { Spacer } from 'shared/ui/Spacer';
import { showErrorAlert } from 'shared/ui/Alert';

import type { RegistrationSchema } from '../model/useRegistrationSchema';
import { useRegistrationSchema } from '../model/useRegistrationSchema';
import { useRegisterMutation } from '../api/useRegisterMutation';

type RegistrationProps = NativeStackScreenProps<RootStackParamList, AppNavigation.REGISTER>;

export const RegistrationScreen = ({ route }: RegistrationProps) => {
  const joinGroupId = route.params?.joinGroupId;
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(useRegistrationSchema()),
  });

  const { mutateAsync: register, isPending } = useRegisterMutation();

  const onSubmitRegistration = async (data: RegistrationSchema) => {
    const { session, error } = await register({ ...data, joinGroupId });
    if (error) {
      showErrorAlert({
        message: error.message || 'An error occurred during registration. Please try again.',
      });
      return;
    }

    if (!session) {
      showErrorAlert({
        message: 'Verify your email to complete registration.',
      });
    }

    // navigation.navigate(AppNavigation.MAIN);
  };

  return (
    <ScreenContent>
      <Spacer size='spacing.lg' />
      <Form>
        <Controller
          control={control}
          name='name'
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <FormInput
              label={t('register.labels.name')}
              value={value}
              onChangeText={onChange}
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <FormInput
              label={t('register.labels.email')}
              value={value}
              onChangeText={onChange}
              keyboardType='email-address'
              autoCapitalize='none'
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <FormPasswordInput
              label={t('register.labels.password')}
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
            />
          )}
        />
        <FilledButton
          text={t('register.buttons.register')}
          onPress={handleSubmit(onSubmitRegistration)}
          loading={isPending}
        />
      </Form>
    </ScreenContent>
  );
};
