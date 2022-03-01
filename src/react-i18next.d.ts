import 'react-i18next';
import en from './locales/en/translation.json';

const resources = {
  en: {
    translation: en,
  },
};

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: typeof resources['en'];
  }
}
