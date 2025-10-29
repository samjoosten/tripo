import { t } from 'i18next';
import { Alert } from 'react-native';

type ErrorAlertConfig = {
  message?: string;
};

export const showErrorAlert = (config: ErrorAlertConfig) => {
  const { message } = config;
  Alert.alert(t('shared.error'), message || 'Please try again later.', [{ text: 'Ok' }]);
};
