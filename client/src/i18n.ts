import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import frJSON from "./locales/fr.json";
import gbJSON from "./locales/gb.json";
i18n.use(initReactI18next).init({
  resources: {
    fr: { ...frJSON },
    gb: { ...gbJSON },
  },
  lng: localStorage.getItem("lng") || "fr",
});
