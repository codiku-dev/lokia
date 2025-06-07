import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { fr } from "./messages/fr";
import { en } from "./messages/en";

const LANGUAGES = ['en', 'fr'] as const;
type Language = typeof LANGUAGES[number];

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en,
            fr
        },
        lng: "en",
        fallbackLng: "en",
        supportedLngs: LANGUAGES,
        load: 'languageOnly',
        nonExplicitSupportedLngs: false,
        interpolation: {
            escapeValue: false
        },

    });

export type { Language };
export { LANGUAGES };
