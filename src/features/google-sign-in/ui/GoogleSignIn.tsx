import { GoogleSignin, isSuccessResponse } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { supabase } from 'shared/api';
import { showErrorAlert } from 'shared/ui/Alert';
import { FilledButton } from 'shared/ui/FilledButton';
import Row from 'shared/ui/Row';
import { ThemedText } from 'shared/ui/ThemedText';

import GoogleLogo from '../../../../assets/images/google.svg';

GoogleSignin.configure({
  webClientId: '571653246314-6ufvidck546lfgml4kncp14a5goga60k.apps.googleusercontent.com',
  iosClientId: '571653246314-aig78rvfae30pai9prb3l69n6kp22pop.apps.googleusercontent.com',
});

export const GoogleSignIn = () => {
  const { t } = useTranslation();
  const [isPending, setIsPending] = useState(false);

  const onGooglePress = async () => {
    try {
      setIsPending(true);
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.data.idToken!,
        });
        if (error) {
          console.error('Supabase Google authentication Error:', error);
          showErrorAlert({
            message: t('socialAuth.googleError'),
          });
        }
      }
    } catch {
      showErrorAlert({
        message: t('socialAuth.googleError'),
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <FilledButton
      lightBorderColor='powderBlue.300'
      lightColor='white'
      darkColor='gray.900'
      darkBorderColor='gray.700'
      borderWidth={2}
      loading={isPending}
      loaderLightColor='powderBlue.500'
      loaderDarkColor='white'
      onPress={onGooglePress}>
      <Row>
        <GoogleLogo width={16} height={16} />
        <ThemedText type='button' lightColor='powderBlue.500' darkColor='white' style={styles.text}>
          {t('login.buttons.google')}
        </ThemedText>
      </Row>
    </FilledButton>
  );
};

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
  },
});
