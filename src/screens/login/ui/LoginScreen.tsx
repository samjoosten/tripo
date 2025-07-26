import { t } from 'i18next';

import { FilledButton } from 'shared/ui/FilledButton';
import { RoundedView } from 'shared/ui/RoundedView/RoundedView';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { ThemedText } from 'shared/ui/ThemedText';

const LoginScreen = () => {
  return (
    <ScreenContent>
      <FilledButton text='Test' />
      <RoundedView
        withShadow
        style={{
          borderRadius: 12,
          borderCurve: 'continuous',
          padding: 24,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ThemedText type='body'>{t('login.title')}</ThemedText>
      </RoundedView>
    </ScreenContent>
  );
};

export default LoginScreen;
