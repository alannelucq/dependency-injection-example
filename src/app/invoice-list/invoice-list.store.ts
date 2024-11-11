import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Invoice } from "./models/invoice.model";
import { computed, inject, InjectionToken } from "@angular/core";
import { exhaustMap, pipe, switchMap, tap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { InvoiceGateway } from "../core/ports/invoice.gateway";
import { CreateInvoice } from "./models/create-invoice.model";
import { setFulfilled, setPending, withRequestStatus } from "../shared/features/request-status.feature";
import { DateProvider } from "../core/ports/date.provider";
import { isAfter } from "../date.helper";

export type InvoiceListState = {
  invoices: Invoice[]
}

export const InvoiceListStateToken = new InjectionToken<InvoiceListState>('InvoiceListStateToken', {
  factory: () => ({invoices: []})
});

export const InvoiceListStore = signalStore(
  withState<InvoiceListState>(() => inject(InvoiceListStateToken)),
  withRequestStatus(),
  withComputed((store, dateProvider = inject(DateProvider)) => ({
    unpaidInvoices: computed(() => store.invoices().filter(invoice => !invoice.isPaid)),
    invoicesInFuture: computed(() => store.invoices().filter(({dueDate}) => isAfter(dueDate, dateProvider.now())))
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
  }))
);
