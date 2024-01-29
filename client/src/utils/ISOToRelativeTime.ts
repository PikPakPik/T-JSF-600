import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslation } from "react-i18next";

dayjs.extend(relativeTime);

export function ISOToRelativeTime(isoDate: string | undefined): string {
  const { i18n } = useTranslation();
  dayjs.locale(i18n.language === "gb" ? "en-gb" : i18n.language);
  const dt = dayjs(isoDate);
  return dt.fromNow();
}
