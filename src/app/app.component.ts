import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceListComponent } from "./invoice-list/invoice-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InvoiceListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'date-dependency-injection';
}
