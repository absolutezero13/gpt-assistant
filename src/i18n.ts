import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEnglish from "./translation/en/translation.json";
import translationTurkish from "./translation/tr/translation.json";

const resources = {
  en: {
    translation: translationEnglish,
  },
  tr: {
    translation: translationTurkish,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  keySeparator: ".",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
