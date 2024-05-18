import { Controller, useForm } from "react-hook-form";
import { Dimensions, Keyboard, View } from "react-native"
import { KeyboardView } from "src/components/KeyboardView"
import { H2Text, TitleText } from "src/components/Text"
import type { RegisterFormData } from "./types";
import { FormInput } from "src/components/FormInput";
import { ArrowRight, Eye, Key, Mail, User } from "lucide-react-native";
import { FilledButton } from "src/components/buttons/FilledButton";
import { useRegisterMutation } from "./queries";
import { Stack, useNavigation, useRouter } from "expo-router";
import { MotiView, useAnimationState } from "moti";
import { useCallback, useEffect, useState } from "react";

const useSlideUp = () => {
  return useAnimationState({
    from: {
      scale: 1,
    },
    slideUp: {
      scale: 0,
    }
  })
}

export const RegisterScreen = () => {
  const slideUp = useSlideUp();
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const navigation = useNavigation();
  const router = useRouter();

  const [headerShown, setHeaderShown] = useState(false);

  const { mutateAsync: register, isPending: registrationPending } = useRegisterMutation({
    onSuccess: () => {
      router.replace('/my-group');
      navigation.reset({
        index: 0,
        routes: [{ name: '(protected)' as never }],
      })
    }
  });

  const handleRegister = async (data: RegisterFormData) => {
    await register(data);
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      setHeaderShown(false);
      slideUp.transitionTo((state) => {
        if (state === 'slideUp') {
          return 'from';
        }
        return state;

      });
    });

    return () => {
      Keyboard.removeAllListeners('keyboardDidHide');
    }
  }, [slideUp])

  const onFocus = () => {
    slideUp.transitionTo('slideUp');
    setHeaderShown(true);
  }

  const renderHeaderTitle = useCallback(() => {
    if (!headerShown) return null;

    return (
      <H2Text className="text-gray-900">Word ook lid!</H2Text>
    )
  }, [headerShown])

  return (
    <>
      <Stack.Screen options={{
        headerTitle: renderHeaderTitle
      }} />
      <KeyboardView>
        <View className="flex-col flex-1 justify-center gap-6">
          <TitleText className='text-gray-900 mb-3'>Word ook lid!</TitleText>
          <View>
            <Controller name="name" control={control} rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label='Je naam'
                  onChangeText={onChange}
                  onFocus={onFocus}
                  value={value}
                  placeholder='Voer je naam in'
                  error={errors.name && 'Dit is een verplicht veld'}
                  AfterIcon={User}
                />
              )} />
          </View>
          <View>
            <Controller name="email" control={control} rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label='Email-adres'
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  onFocus={onFocus}
                  value={value}
                  placeholder='Voer je email-adres in'
                  error={errors.email && 'Dit is een verplicht veld'}
                  AfterIcon={Mail}
                />
              )} />
          </View>
          <View>
            <Controller name="password" control={control} rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormInput
                  label='Wachtwoord'
                  onChangeText={onChange}
                  onFocus={onFocus}
                  value={value}
                  secureTextEntry
                  placeholder='Voer je wachtwoord in'
                  error={errors.password && 'Dit is een verplicht veld'}
                  AfterIcon={Eye}
                />
              )}
            />
          </View>
          <View>
            <FilledButton
              onPress={handleSubmit(handleRegister, console.error)}
              loading={registrationPending}
              label="Account aanmaken"
              Icon={ArrowRight}
            />
          </View>
        </View>
      </KeyboardView>
    </>
  )
}