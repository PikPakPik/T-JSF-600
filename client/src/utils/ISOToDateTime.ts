import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useTranslation } from "react-i18next";
dayjs.extend(localizedFormat);
import("dayjs/locale/fr");

export function ISOToDateTime(isoDate: string | undefined): string {
  const { i18n } = useTranslation();
  dayjs.locale(i18n.language === "gb" ? "en-gb" : i18n.language);
  const dt = dayjs(isoDate);
  return dt.format("LLL");
}
