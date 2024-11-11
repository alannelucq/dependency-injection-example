import { FakeInvoiceGateway } from "../core/adapters/fake-invoice.gateway";
import { InvoiceGateway } from "../core/ports/invoice.gateway";
import { TestBed } from "@angular/core/testing";
import { FakeDateProvider } from "../core/adapters/fake-date.provider";
import { DateProvider } from "../core/ports/date.provider";
import { on } from "../date.helper";
import { InvoiceListState, InvoiceListStateToken, InvoiceListStore } from "./invoice-list.store";
import { StubInvoiceBuilder } from "./models/invoice.model";

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
      '001': StubInvoiceBuilder().reference('001').build(),
      '002': StubInvoiceBuilder().reference('002').build(),
    }
    const store = initStore({invoices: []});
    store.getInvoices();
    expect(store.invoices()).toEqual([
      StubInvoiceBuilder().reference('001').build(),
      StubInvoiceBuilder().reference('002').build()
    ]);
  });

  it('should return only dates in the future', () => {
    dateProvider.withToday(on('19/09/2024'));
    const store = initStore({
      invoices: [
        StubInvoiceBuilder().reference('001').dueDate(on('19/09/2024')).build(),
        StubInvoiceBuilder().reference('002').dueDate(on('20/09/2024')).build(),
      ]
    });

    expect(store.invoicesInFuture()).toEqual([
      StubInvoiceBuilder().reference('002').dueDate(on('20/09/2024')).build()
    ]);
  });

  function initStore(partial?: Partial<InvoiceListState>) {
    TestBed.overrideProvider(InvoiceListStateToken, {useValue: partial});
    return TestBed.inject(InvoiceListStore);
  }
});
