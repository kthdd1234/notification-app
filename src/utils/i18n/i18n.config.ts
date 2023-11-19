import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguaeDetector from 'i18next-browser-languagedetector';
import en from './translations/en.json';
import ko from './translations/ko.json';
import {getLocales} from 'react-native-localize';

const resources = {
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
};

export const languageCode = getLocales()[0].languageCode;

i18n
  .use(LanguaeDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    lng: languageCode,
    fallbackLng: 'en',
    debug: true,
    compatibilityJSON: 'v3',
    keySeparator: false,
    supportedLngs: ['en', 'ko'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
