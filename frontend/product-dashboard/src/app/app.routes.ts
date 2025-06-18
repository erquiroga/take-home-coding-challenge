import { Routes } from '@angular/router';
import { ProductDashboardComponent } from './views/dashboard/product-dashboard.component';
import { CreateProductComponent } from './products/product-create/create-product.component';

export const routes: Routes = [
  { path: '', component: ProductDashboardComponent },
  { path: 'create', component: CreateProductComponent },
];