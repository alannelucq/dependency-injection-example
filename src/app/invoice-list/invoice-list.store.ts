import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { computed, inject } from "@angular/core";
import { Invoice } from "./invoice.model";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { InvoiceGateway } from "../core/ports/invoice.gateway";
import { isAfter } from "../date.helper";
import { setFulfilled, setPending, withRequestStatus } from "../shared/features/request-status.feature";

export type InvoiceListState = {
  invoices: Invoice[];
}

export const InvoiceListStore = signalStore(
  withRequestStatus(),
  withState<InvoiceListState>({invoices: []}),
  withComputed((store) => ({
    unpaidInvoices: computed(() => store.invoices().filter(({isPaid}) => !isPaid)),
    invoicesInFuture: computed(() => store.invoices().filter(({dueDate}) => isAfter(dueDate, new Date())))
  })),
  withMethods((store, invoiceGateway = inject(InvoiceGateway)) => ({
      getInvoices: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending())),
          switchMap(() => invoiceGateway.getAllInvoices()),
          tap(invoices => patchState(store, {invoices}, setFulfilled())),
        )
      )
    })
  ),
  withHooks(store => ({
    onInit() {
      store.getInvoices();
    }
  }))
)
