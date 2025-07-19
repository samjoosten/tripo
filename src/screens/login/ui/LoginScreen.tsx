import { t } from 'i18next';

import { FilledButton } from 'shared/ui/FilledButton';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { ShadowView } from 'shared/ui/ShadowView';
import { ThemedText } from 'shared/ui/ThemedText';

const LoginScreen = () => {
  return (
    <ScreenContent>
      <FilledButton text='Test' />
      <ShadowView
        style={{
          borderRadius: 20,
          borderCurve: 'continuous',
          padding: 24,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ThemedText type='body'>{t('login.title')}</ThemedText>
      </ShadowView>
    </ScreenContent>
  );
};

export default LoginScreen;
