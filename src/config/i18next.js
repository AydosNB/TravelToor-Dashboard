import i18n from "i18next";
import { initReactI18next } from "react-i18next"
import eng from "./lang/eng";
import rus from "./lang/rus";
import qar from "./lang/qar";


i18n
    .use(initReactI18next)
    .init({
        resources: {
            eng: eng,
            rus: rus,
            qar: qar
        },
        lng: "eng",
        fallbackLng: 'eng',
        interpolation: {
            escapeValue: false, // not needed for react!!
        }
    })

export default i18n
