import { ScrollView, Text, View } from "react-native"
import { FormInput } from "src/components/FormInput"
import { BodyText, TitleText } from "src/components/Text"
import { ArrowRight, Eye, Forward, Mail } from "lucide-react-native";
import { COLORS } from "src/config/colors";
import { KeyboardView } from "src/components/KeyboardView";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import type { LoginFormData } from "./types";
import { FilledButton } from "src/components/buttons/FilledButton";
import { TextButton } from "src/components/buttons/TextButton";
import { useSnackbar } from "src/components/snackbar/hooks";
import { SnackbarType } from "src/components/snackbar/types";
import { useLoginMutation } from "./queries";

export const LoginScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const snackbar = useSnackbar();

  const { mutateAsync: login, isPending: loginPending } = useLoginMutation({
    onError: (error) => {
      snackbar.showSnackbar({ message: error.message, type: SnackbarType.ERROR, duration: 3000 })
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  }

  return (
    <View style={{ height: '100%'}}>
      <KeyboardView>
        <View className="flex-col flex-1 justify-center gap-6">
          <TitleText className='text-gray-900 mb-3'>Elke dag een nieuwe
            <TitleText className='text-primary-800 font-architects-daughter'> challenge</TitleText>
          </TitleText>
          <View>
            <Controller name="email" control={control} rules={{ required: true }}
              render={({ field: { value, onBlur, onChange } }) => (
                <FormInput
                  label='Email-adres'
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder='Voer je email-adres in'
                  error={errors.email && 'Email is verplicht'}
                  AfterIcon={Mail}
                />
              )} />
          </View>
          <View>
            <Controller name="password" control={control} rules={{ required: true }}
              render={({ field: { value, onBlur, onChange } }) => (
                <FormInput
                  label='Wachtwoord'
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  style={{ lineHeight: 15 }}
                  placeholder='Voer je wachtwoord in'
                  error={errors.password && 'Wachtwoord is een verplicht veld'}
                  AfterIcon={Eye}
                />
              )}
            />
          </View>
          <View>
            <FilledButton
              onPress={handleSubmit(onSubmit)}
              loading={loginPending}
              label="Inloggen"
              Icon={ArrowRight}
            />
          </View>
          <View className="flex-row justify-center items-center">
            <BodyText>Nog geen account? </BodyText>
            <TextButton href="/register" label="Registreer nu." className="text-base"/>
          </View>
        </View>
      </KeyboardView>
    </View>
  )
}