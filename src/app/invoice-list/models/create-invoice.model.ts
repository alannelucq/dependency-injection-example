import { Invoice } from "./invoice.model";

export type CreateInvoice = Omit<Invoice, 'id' | 'isPaid' | 'dueDate'>;
