import { InvoiceGateway } from "../ports/invoice.gateway";
import { Observable, of } from "rxjs";
import { Invoice } from "../../invoice-list/models/invoice.model";
import { CreateInvoice } from "../../invoice-list/models/create-invoice.model";

export class FakeInvoiceGateway extends InvoiceGateway {

  invoiceById: Record<string, Invoice> = {};
  createdInvoice: Invoice;

  withCreatedInvoice(invoice: Invoice) {
    this.createdInvoice = invoice;
    return this;
  }

  getAllInvoices(): Observable<Invoice[]> {
    return of(Object.values(this.invoiceById));
  }

  createInvoice(invoice: CreateInvoice): Observable<Invoice> {
    return of(this.createdInvoice);
  }
}
