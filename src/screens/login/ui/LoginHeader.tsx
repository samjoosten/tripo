import { useTranslation } from 'react-i18next';

import { ThemedText } from 'shared/ui/ThemedText';

export const LoginHeader = () => {
  const { t } = useTranslation();

  return (
    <ThemedText type='title'>
      {t('login.title')}{' '}
      <ThemedText type='title' fontFamily='ArchitectsDaughter-Regular' lightColor='azure.500' darkColor='azure.500'>
        challenge
      </ThemedText>
    </ThemedText>
  );
};
