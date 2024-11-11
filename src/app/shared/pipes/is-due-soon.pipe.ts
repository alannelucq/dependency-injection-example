import { Pipe, PipeTransform } from "@angular/core";
import { Invoice } from "../../invoice-list/models/invoice.model";

@Pipe({
  name: 'isDueSoon',
  standalone: true
})
export class IsDueSoonPipe implements PipeTransform {
  transform(invoice: Invoice, date: Date): boolean {
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(date.getDate() + 3);
    const dueDate = new Date(invoice.dueDate);
    return dueDate <= threeDaysFromNow && dueDate >= date && !invoice.isPaid;
  }
}
