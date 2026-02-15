import { t } from 'i18next';
import { Alert } from 'react-native';

type ErrorAlertConfig = {
  message?: string;
  data?: unknown;
};

export const showErrorAlert = (config: ErrorAlertConfig) => {
  const { message, data } = config;

  if (__DEV__ && data) {
    console.error('Error Alert Data:', data);
  }

  Alert.alert(t('shared.error'), message || 'Please try again later.', [{ text: 'Ok' }]);
};
