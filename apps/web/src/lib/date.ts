import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";

type Options = {
  includeTime?: boolean;
};

export function humanReadableDate(date: Date, options?: Options) {
  return format(date, options?.includeTime ? "PPP в p" : "PPP", {
    locale: ru,
  });
}
