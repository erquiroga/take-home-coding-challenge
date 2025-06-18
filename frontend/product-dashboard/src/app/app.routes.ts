import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout.component';
import { ProductDashboardComponent } from './views/dashboard/product-dashboard.component';
import { CreateProductComponent } from './products/pages/create-product.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ProductDashboardComponent },
      { path: 'create', component: CreateProductComponent }
    ]
  }
];