import { Pipe, PipeTransform } from "@angular/core";
import { Invoice } from "../../invoice-list/models/invoice.model";

@Pipe({
  name: 'isPast',
  standalone: true
})
export class IsPastPipe implements PipeTransform {
  transform(invoice: Invoice, date: Date): boolean {
    const dueDate = new Date(invoice.dueDate);
    return dueDate < date && !invoice.isPaid;
  }
}
