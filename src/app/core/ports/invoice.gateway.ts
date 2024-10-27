import { Observable } from "rxjs";
import { Invoice } from "../../invoice-list/models/invoice.model";
import { CreateInvoice } from "../../invoice-list/models/create-invoice.model";

export abstract class InvoiceGateway {
  abstract getAllInvoices(): Observable<Invoice[]>;

  abstract createInvoice(invoice: CreateInvoice): Observable<Invoice>;
}
