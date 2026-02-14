import { AppleIcon } from '@hugeicons-pro/core-solid-rounded';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform } from 'react-native';

import { FilledButton } from 'shared/ui/FilledButton';
import { showErrorAlert } from 'shared/ui/Alert';
import { supabase } from 'shared/api';

export const AppleSignIn = () => {
  const { t } = useTranslation();
  const [isPending, setIsPending] = useState(false);

  const onApplePress = async () => {
    try {
      setIsPending(true);
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (!credential || !credential.identityToken) {
        console.warn('Apple Sign-In was cancelled or failed to complete.');
        return;
      }

      const { error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
      });

      if (error) {
        console.error('Supabase Apple Sign-In Error:', error);
        showErrorAlert({
          message: t('socialAuth.appleError'),
        });
      }
    } catch (e) {
      console.error('Apple Sign-In Error:', e);
    } finally {
      setIsPending(false);
    }
  };

  if (Platform.OS !== 'ios') return null;

  return (
    <FilledButton
      borderWidth={2}
      lightColor='gray.900'
      lightBorderColor='gray.900'
      darkColor='gray.900'
      darkBorderColor='gray.700'
      leadingIcon={AppleIcon}
      text={t('login.buttons.apple')}
      loading={isPending}
      onPress={onApplePress}
    />
  );
};
