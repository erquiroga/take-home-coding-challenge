import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  // providers: [provideHttpClient()], // Removed, should be provided in the application bootstrap
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'product-dashboard';
}
