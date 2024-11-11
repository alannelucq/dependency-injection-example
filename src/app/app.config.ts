import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { registerLocaleData } from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import { InvoiceListStore } from "./invoice-list/invoice-list.store";
import { FakeInvoiceGateway } from "./core/adapters/fake-invoice.gateway";
import { InvoiceGateway } from "./core/ports/invoice.gateway";
import { DateProvider } from "./core/ports/date.provider";
import { SystemDateProvider } from "./core/adapters/system-date.provider";
import { on } from "./date.helper";

registerLocaleData(localeFr, 'fr');
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {provide: LOCALE_ID, useValue: 'fr'},
    InvoiceListStore,
    {provide: DateProvider, useClass: SystemDateProvider},
    {
      provide: InvoiceGateway, useFactory: () => {
        const gateway = new FakeInvoiceGateway();
        gateway.invoiceById = {
          '001': {reference: '001', dueDate: on('13/11/2024'), isPaid: false},
          '002': {reference: '002', dueDate: on('10/11/2024'), isPaid: true},
          '003': {reference: '003', dueDate: on('09/11/2024'), isPaid: false},
          '004': {reference: '004', dueDate: on('27/11/2024'), isPaid: false}
        };
        return gateway;
      }
    }
  ],
};
