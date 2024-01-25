import "moment/locale/en-gb";
import "moment/locale/fr";
import moment from "moment/min/moment-with-locales";
import { useTranslation } from "react-i18next";

export function ISOToDateTime(isoDate: string): string {
  const { i18n } = useTranslation();
  moment.locale(i18n.language);
  const mmnt = moment(isoDate);
  return mmnt.format("LLL");
}
