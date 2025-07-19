import type { LanguageDetectorAsyncModule } from 'i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getLocalize } from 'shared/lib/intl/getLocalize';

import en from '../../../../assets/locales/en.json';
import nl from '../../../../assets/locales/nl.json';

import type { LanguageType } from './types/localize';
import { LanguageList } from './types/localize';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback) => {
    try {
      const languageCode = getLocalize<LanguageType>();
      callback(languageCode);
    } catch {
      callback(LanguageList.EN);
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

void i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    debug: true,
    fallbackLng: LanguageList.EN,
    resources: {
      en: {
        translation: en,
      },
      nl: {
        translation: nl,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
