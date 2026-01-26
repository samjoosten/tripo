import { Platform, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppleIcon } from '@hugeicons-pro/core-solid-rounded';
import * as AppleAuthentication from 'expo-apple-authentication';
import { GoogleSignin, statusCodes, isSuccessResponse } from '@react-native-google-signin/google-signin';

import { FilledButton } from 'shared/ui/FilledButton';
import Row from 'shared/ui/Row';
import { ThemedText } from 'shared/ui/ThemedText';
import Column from 'shared/ui/Column';
import { supabase } from 'shared/api';
import { showErrorAlert } from 'shared/ui/Alert';

import GoogleLogo from '../../../../assets/images/google.svg';

GoogleSignin.configure({
  webClientId: '571653246314-6ufvidck546lfgml4kncp14a5goga60k.apps.googleusercontent.com',
  iosClientId: '571653246314-aig78rvfae30pai9prb3l69n6kp22pop.apps.googleusercontent.com',
});

const SocialAuth = () => {
  const { t } = useTranslation();

  const onGooglePress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.data.idToken!,
        });
        if (error) {
          console.error('Supabase Google Sign-In Error:', error);
          showErrorAlert({
            // message: t('socialAuth.googleError'),
            message: 'An error occurred while signing in with Google. Please try again.',
          });
          return;
        }
        console.log('Supabase Google Sign-In successful, user:', data);
      }
    } catch (error) {
      const errorCode = (error as { code: (typeof statusCodes)[keyof typeof statusCodes] }).code;
      if (errorCode === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showErrorAlert({
          // message: t('socialAuth.playServicesNotAvailable'),
          message: 'Google Play Services are not available or outdated on this device.',
        });
      } else if (errorCode === statusCodes.NULL_PRESENTER) {
        showErrorAlert({
          // message: t('socialAuth.googleNullPresenter'),
          message: 'Google Sign-In configuration error. Please contact support.',
        });
      } else {
        console.error('Google Sign-In Error:', error);
      }
    }
  };

  const onApplePress = async () => {
    try {
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

      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
      });

      if (error) {
        console.error('Supabase Apple Sign-In Error:', error);
        showErrorAlert({
          message: t('socialAuth.appleError'),
        });
        return;
      }

      console.log('Apple Sign-In successful, user:', user);
    } catch (e) {
      console.error('Apple Sign-In Error:', e);
    }
  };

  return (
    <Column spacing='spacing.xs'>
      {Platform.OS === 'ios' && (
        <FilledButton
          borderWidth={2}
          lightColor='gray.900'
          lightBorderColor='gray.900'
          darkColor='gray.900'
          darkBorderColor='gray.700'
          leadingIcon={AppleIcon}
          text={t('login.buttons.apple')}
          onPress={onApplePress}
        />
      )}
      <FilledButton
        lightBorderColor='powderBlue.300'
        lightColor='white'
        darkColor='gray.900'
        darkBorderColor='gray.700'
        borderWidth={2}
        onPress={onGooglePress}>
        <Row>
          <GoogleLogo width={16} height={16} />
          <ThemedText type='button' lightColor='powderBlue.500' darkColor='white' style={styles.text}>
            {t('login.buttons.google')}
          </ThemedText>
        </Row>
      </FilledButton>
    </Column>
  );
};

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
  },
});

export default SocialAuth;
