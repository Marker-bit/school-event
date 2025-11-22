import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";

export function humanReadableDate(date: Date) {
  return format(date, "PPP в p", {
    locale: ru,
  });
}
