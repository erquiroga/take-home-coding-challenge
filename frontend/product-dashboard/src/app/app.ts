import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './products/pages/product-list.component';
import { ProductDetailComponent } from './products/pages/product-detail.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  // providers: [provideHttpClient()], // Removed, should be provided in the application bootstrap
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'product-dashboard';
}
