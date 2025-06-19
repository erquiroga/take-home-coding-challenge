import { Routes } from '@angular/router';
import { ProductDashboardComponent } from './dashboard/product-dashboard.component';
import { CreateProductComponent } from './products/product-create/create-product.component';

export const routes: Routes = [
  { path: '', component: ProductDashboardComponent },
  { path: 'create', component: CreateProductComponent },
  {
    path: 'edit/:id',
    loadComponent: () => import('./products/product-create/create-product.component').then(m => m.CreateProductComponent)
  }
];