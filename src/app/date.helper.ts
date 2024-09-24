import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";

dayjs.extend(customParseFormat);
export function on(format: string): Date {
  return dayjs(format, "DD/MM/YYYY").startOf("day").toDate();
}

export function isAfter(firstDate: Date, secondDate: Date) {
  return dayjs(firstDate).isAfter(secondDate);
}

export function isBefore(firstDate: Date, secondDate: Date) {
  return dayjs(firstDate).isBefore(secondDate);
}
