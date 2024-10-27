import { Component, inject } from '@angular/core';
import { InvoiceListStore } from "./invoice-list.store";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  template: `
    {{ store.invoices() }}
    {{ store.unpaidInvoices() }}
    <div class="container flex p-8">
      <h1 class="text-4xl font-extrabold mb-2 text-center text-indigo-800">Factures</h1>
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
            @for (invoice of store.invoices(); track invoice.id) {
              <!-- Display invoice -->
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  providers: [InvoiceListStore]
})
export class InvoiceListComponent {
  readonly store = inject(InvoiceListStore);

  form = inject(FormBuilder).nonNullable.group({
    reference: ['', Validators.required],
    dueDate: ['', Validators.required],
  });

  createInvoice() {
    this.form.markAllAsTouched();
    if (this.form.valid) return;
    this.store.createInvoice(this.form.getRawValue());
  }
}
