import { formatDistanceToNow, isMatch, parse } from "date-fns";
import { es } from "date-fns/locale";

export function RelativeDate({ date }: { date: string }) {
  if (isMatch(date, "yyyy-MM-dd")) {
    const dateObject = parse(date, "yyyy-MM-dd", new Date());
    const relativeDate = formatDistanceToNow(dateObject, {
      addSuffix: true,
      locale: es,
    });
    return <span>{relativeDate}</span>;
  } else {
    return <></>;
  }
}
