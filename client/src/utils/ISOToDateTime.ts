import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export function ISOToDateTime(isoDate: string | undefined): string {
  const { i18n } = useTranslation();
  dayjs.locale(i18n.language);
  const dt = dayjs(isoDate);
  return dt.format("LLL");
}
