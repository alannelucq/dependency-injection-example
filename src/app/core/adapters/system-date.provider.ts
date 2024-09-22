import { DateProvider } from "../ports/date.provider";

export class SystemDateProvider extends DateProvider {
  now(): Date {
    return new Date();
  }
}
