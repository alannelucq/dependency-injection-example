import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { computed, inject, InjectionToken } from "@angular/core";
import { Invoice } from "./invoice.model";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { InvoiceGateway } from "../core/ports/invoice.gateway";
import { DateProvider } from "../core/ports/date.provider";
import { isAfter } from "../date.helper";

// @TODO : Vidéo 1 pour montrer comment utiliser le Signal Store
// @TODO : Vidéo 2 pour montrer comment tester un Signal Store

export type InvoiceListState = {
  invoices: Invoice[];
}

export type InvoiceListStore = InstanceType<typeof InvoiceListStore>;

export const InvoiceListStateToken = new InjectionToken<InvoiceListState>('InvoiceListStateToken', {
  factory: () => ({invoices: []})
});

export const InvoiceListStore = signalStore(
  withState<InvoiceListState>(() => inject(InvoiceListStateToken)),
  withComputed((store, dateProvider = inject(DateProvider)) => ({
    // @TODO : Can't be tested because we rely on new Date(), which return a different value each time
    // @TODO : Show example of test passing with new Date(), but it's malicious because it will fail later
    invoicesInFuture: computed(() => store.invoices().filter(({dueDate}) => isAfter(dueDate, dateProvider.now())))
  })),
  withMethods((store, invoiceGateway = inject(InvoiceGateway)) => ({
      getInvoices: rxMethod<void>(
        pipe(
          switchMap(() => invoiceGateway.getAllInvoices()),
          tap(invoices => patchState(store, { invoices })),
        )
      )
    })
  )
)
