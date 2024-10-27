import { InvoiceGateway } from "../ports/invoice.gateway";
import { Observable, of } from "rxjs";
import { Invoice } from "../../invoice-list/models/invoice.model";

export class FakeInvoiceGateway extends InvoiceGateway {

  invoiceById: Record<string, Invoice> = {};

  getAllInvoices(): Observable<Invoice[]> {
    return of(Object.values(this.invoiceById));
  }
}
