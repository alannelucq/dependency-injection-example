import { Component, inject } from '@angular/core';
import { NgClass, DatePipe } from '@angular/common';
import { IsPastPipe } from "./is-past.pipe";
import { IsDueSoonPipe } from "./is-due-soon.pipe";
import { InvoiceListStore } from "./invoice-list.store";
import { DateProvider } from "../core/ports/date.provider";

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  template: `
    <div class="container mx-auto p-8">
      <h1 class="text-4xl font-extrabold mb-2 text-center text-indigo-800">Factures</h1>
      <p class="text-lg mb-8 text-center ">Date du jour : {{ today | date: 'longDate' }}</p>
      <div class="shadow-lg rounded-lg overflow-hidden">
        <table class="min-w-full table-auto">
          <thead>
          <tr class="bg-indigo-600 text-white text-left">
            <th class="p-4">Référence</th>
            <th class="p-4">Échéance</th>
            <th class="p-4">État</th>
          </tr>
          </thead>
          <tbody>
            @for (invoice of store.invoices(); track invoice.reference) {
              <tr class="bg-white-100" [ngClass]="{
                  'bg-red-100': (invoice| isPast:today),
                  'bg-yellow-100': (invoice | isDueSoon:today),
                  'bg-green-100 border-green-400': invoice.isPaid
                }">
                <td class="p-4">
                  #{{ invoice.reference }}
                </td>
                <td class="p-4">{{ invoice.dueDate | date: 'longDate' }}</td>
                <td class="p-4">
                  @if (invoice| isPast:today) {
                    <span class="text-sm font-medium px-3 py-1 rounded-full bg-red-200 text-red-700">
                      En retard
                    </span>
                  } @else if (invoice | isDueSoon:today) {
                    <span class="text-sm font-medium px-3 py-1 rounded-full bg-yellow-200 text-yellow-700">
                      À venir
                    </span>
                  } @else if (!invoice.isPaid) {
                    <span class="text-sm font-medium px-3 py-1 rounded-full border-red-700 border text-red-700">
                      À payer
                    </span>
                  } @else {
                    <span class="text-sm font-medium px-3 py-1 rounded-full bg-green-200 text-green-700">
                      Payée
                    </span>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  imports: [
    NgClass,
    DatePipe,
    IsPastPipe,
    IsDueSoonPipe
  ]
})
export class InvoiceListComponent {
  readonly today = inject(DateProvider).now();
  readonly store = inject(InvoiceListStore);
}
