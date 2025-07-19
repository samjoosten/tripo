import { getLocales } from 'expo-localization';

export const getLocalize = <T extends string = 'en'>(): T => {
  const locales = getLocales();
  const languageCode = locales[0]?.languageCode || 'en';
  return languageCode as T;
};
