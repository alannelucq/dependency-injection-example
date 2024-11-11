import { StrictBuilder } from "builder-pattern";
import { on } from "../../date.helper";

export type Invoice = {
  reference: string;
  dueDate: Date;
  isPaid: boolean;
};

export function StubInvoiceBuilder() {
  return StrictBuilder<Invoice>()
    .reference('REF_001')
    .isPaid(false)
    .dueDate(on('19/09/2024'))
}
