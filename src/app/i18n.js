import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-xhr-backend';

import translationEN from '../locales/en/translation.json';
import translationFR from '../locales/fr/translation.json';
import translationVN from '../locales/vn/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  vn: {
    translation: translationVN,
  },
};
// console.log(LanguageDetector);
i18n
  // learn more: https://github.com/i18next/i18next-xhr-backend
  // .use(Backend)
  .use(LanguageDetector) // passes i18n down to react-i18next
  .use(initReactI18next) // connect with React
  // .use(reactI18nextModule) // passes i18n down to react-i18next - Error: Attempted import error: 'reactI18nextModule' is not exported from 'react-i18next'.
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    resources,
    // lng: 'en', // unset to get browser language (LanguageDetector)
    // keySeparator: true,
    fallbackLng: 'en',
    whitelist: ['en', 'fr', 'vn'],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // backend: {
    // loadPath: 'https://static.chinhle.ca/locales/{{lng}}/{{ns}}.json',
    // from public folder
    // loadPath: '/locales/{{lng}}/{{ns}}.json',
    // crossDomain: true,
    // },
  });
// console.log(i18n);

export default i18n;
