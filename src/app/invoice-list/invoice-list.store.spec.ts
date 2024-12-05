import { FakeInvoiceGateway } from "../core/adapters/fake-invoice.gateway";
import { InvoiceGateway } from "../core/ports/invoice.gateway";
import { TestBed } from "@angular/core/testing";
import { FakeDateProvider } from "../core/adapters/fake-date.provider";
import { DateProvider } from "../core/ports/date.provider";
import { on } from "../date.helper";
import { InvoiceListState, InvoiceListStateToken, InvoiceListStore } from "./invoice-list.store";

describe('InvoiceListStore', () => {
  let invoiceGateway: FakeInvoiceGateway;
  let dateProvider: FakeDateProvider;

  beforeEach(() => {
    invoiceGateway = new FakeInvoiceGateway();
    dateProvider = new FakeDateProvider();

    TestBed.configureTestingModule({
      providers: [
        InvoiceListStore,
        {provide: DateProvider, useValue: dateProvider},
        {provide: InvoiceGateway, useValue: invoiceGateway},
      ]
    });
  });

  it('should have default value', () => {
    const store = initStore();
    expect(store.invoices()).toEqual([]);
  });

  it('should retrieve invoices', () => {
    invoiceGateway.invoiceById = {
      '001': {reference: '001', dueDate: on('19/09/2024'), isPaid: false},
      '002': {reference: '002', dueDate: on('20/09/2024'), isPaid: false},
    }
    const store = initStore({invoices: []});
    store.getInvoices();
    expect(store.invoices()).toEqual([
      {reference: '001', dueDate: on('19/09/2024'), isPaid: false},
      {reference: '002', dueDate: on('20/09/2024'), isPaid: false}
    ]);
  });

  it('should return only dates in the future', () => {
    dateProvider.withToday(on('19/09/2024'));
    const store = initStore({
      invoices: [
        {reference: '001', dueDate: on('19/09/2024'), isPaid: false},
        {reference: '002', dueDate: on('20/09/2024'), isPaid: false},
      ]
    });

    expect(store.invoicesInFuture()).toEqual([
      {reference: '002', dueDate: on('20/09/2024'), isPaid: false},
    ]);
  });

  function initStore(partial?: Partial<InvoiceListState>) {
    TestBed.overrideProvider(InvoiceListStateToken, {useValue: partial});
    return TestBed.inject(InvoiceListStore);
  }
});
