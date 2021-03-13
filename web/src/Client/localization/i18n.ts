import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Language } from "@shared/Interfaces/Language.interface";

export const init = (lang: Language, server: boolean) => {
  if(i18n.isInitialized && !server) {
    return;
  }
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        [lang._]: lang,
      },
      fallbackLng: lang._,
      debug: false,
      interpolation: {
        escapeValue: false,
      },
    });
};

export default i18n;
