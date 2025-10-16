import { Platform, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppleIcon } from '@hugeicons-pro/core-solid-rounded';

import { FilledButton } from 'shared/ui/FilledButton';
import Row from 'shared/ui/Row';
import { ThemedText } from 'shared/ui/ThemedText';
import Column from 'shared/ui/Column';

import GoogleLogo from '../../../../assets/images/google.svg';

const SocialAuth = () => {
  const { t } = useTranslation();

  return (
    <Column spacing='spacing.xs'>
      {Platform.OS === 'ios' && (
        <FilledButton color='gray.900' leadingIcon={AppleIcon} text={t('login.buttons.apple')} />
      )}
      <FilledButton borderColor='powderBlue.300' color='white' borderWidth={2}>
        <Row>
          <GoogleLogo width={16} height={16} />
          <ThemedText type='button' color='powderBlue.500' style={styles.text}>
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
