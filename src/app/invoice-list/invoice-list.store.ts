import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { Invoice } from "./models/invoice.model";
import { computed, inject } from "@angular/core";
import { exhaustMap, pipe, switchMap, tap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { InvoiceGateway } from "../core/ports/invoice.gateway";
import { CreateInvoice } from "./models/create-invoice.model";
import { setFulfilled, setPending, withRequestStatus } from "../shared/features/request-status.feature";

type InvoiceListState = {
  invoices: Invoice[]
}

export const InvoiceListStore = signalStore(
  withState<InvoiceListState>({invoices: []}),
  withRequestStatus(),
  withComputed(store => ({
    unpaidInvoices: computed(() => store.invoices().filter(invoice => !invoice.isPaid)),
  })),
  withMethods((store, invoiceGateway = inject(InvoiceGateway)) => ({
    getInvoices: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setPending())),
        switchMap(() => invoiceGateway.getAllInvoices()),
        tap(invoices => patchState(store, {invoices}, setFulfilled())),
      )
    ),
    createInvoice: rxMethod<CreateInvoice>(
      pipe(
        exhaustMap(invoice => invoiceGateway.createInvoice(invoice)),
        tap(invoice => patchState(store, {invoices: [...store.invoices(), invoice]})),
      )
    ),
  })),
  withHooks(store => ({
    onInit() {
      store.getInvoices();
    },
    onDestroy() {
      // Some code ...
    }
  }))
);
