import { Component } from '@angular/core';
import { ProductListComponent } from '../../products/product-list/product-list.component';
import { ProductDetailComponent } from '../../products/product-detail/product-detail.component';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-product-dashboard',
    imports: [CommonModule, ProductListComponent, ProductDetailComponent],
    templateUrl: './product-dashboard.component.html'
})
export class ProductDashboardComponent {
    selectedProductId: number | null = null;

    onProductSelected(id: number) {
        this.selectedProductId = id;
    }
}   