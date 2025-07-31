import { t } from 'i18next';
import { StyleSheet } from 'react-native';

import { sv } from 'shared/lib/theme';
import { FilledButton } from 'shared/ui/FilledButton';
import { RoundedView } from 'shared/ui/RoundedView/RoundedView';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { ThemedText } from 'shared/ui/ThemedText';

export const LoginScreen = () => {
  return (
    <ScreenContent style={styles.container}>
      <ThemedText type='title'>
        {t('login.title')}{' '}
        <ThemedText type='title' fontFamily='ArchitectsDaughter-Regular' color='azure.500'>
          challenge
        </ThemedText>
      </ThemedText>
    </ScreenContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: sv('spacing.m'),
  },
});
