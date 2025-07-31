import { useTranslation } from 'react-i18next';

import { ThemedText } from 'shared/ui/ThemedText';

export const LoginHeader = () => {
  const { t } = useTranslation();

  return (
    <ThemedText type='title'>
      {t('login.title')}{' '}
      <ThemedText type='title' fontFamily='ArchitectsDaughter-Regular' color='azure.500'>
        challenge
      </ThemedText>
    </ThemedText>
  );
};
