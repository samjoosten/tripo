import { Platform, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppleIcon } from '@hugeicons-pro/core-solid-rounded';
import * as AppleAuthentication from 'expo-apple-authentication';

import { FilledButton } from 'shared/ui/FilledButton';
import Row from 'shared/ui/Row';
import { ThemedText } from 'shared/ui/ThemedText';
import Column from 'shared/ui/Column';
import { supabase } from 'shared/api';
import { showErrorAlert } from 'shared/ui/Alert';

import GoogleLogo from '../../../../assets/images/google.svg';

const SocialAuth = () => {
  const { t } = useTranslation();

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
        borderWidth={2}>
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
