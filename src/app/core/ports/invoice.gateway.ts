import { Observable } from "rxjs";
import { Invoice } from "../../invoice-list/invoice.model";

export abstract class InvoiceGateway {
  abstract getAllInvoices(): Observable<Invoice[]>;
}
