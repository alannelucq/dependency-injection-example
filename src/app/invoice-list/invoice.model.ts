import { StrictBuilder } from "builder-pattern";
import { on } from "../date.helper";

export type Invoice = {
  reference: string;
  dueDate: Date;
  isPaid: boolean;
};

export function StubInvoiceBuilder() {
  return StrictBuilder<Invoice>()
    .reference("001")
    .dueDate(on("20/09/2024"))
    .isPaid(false);
}
