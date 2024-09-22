import { DateProvider } from "../ports/date.provider";

export class FakeDateProvider extends DateProvider {

  date: Date;

  withToday(date: Date) {
    this.date = date;
    return this;
  }

  now(): Date {
    return this.date
  }
}
