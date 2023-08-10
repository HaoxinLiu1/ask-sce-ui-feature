import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from '../../assets/locales/en/strings.json';
import translationES from '../../assets/locales/es/strings.json';

const fallbackLng = ['en'];

export const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
} as const;

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,
    detection: {
      checkWhitelist: true,
    },
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });
