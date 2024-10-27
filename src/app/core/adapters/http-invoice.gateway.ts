import { InvoiceGateway } from "../ports/invoice.gateway";
import { Invoice } from "../../invoice-list/models/invoice.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";

export class HttpInvoiceGateway extends InvoiceGateway {
  private readonly http = inject(HttpClient);

  getAllInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>('/api/invoices');
  }
}
