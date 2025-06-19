import { Component, computed, signal } from '@angular/core';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { ProductDetailComponent } from '../products/product-detail/product-detail.component';
import { CommonModule } from '@angular/common';
import { Product } from '../products/shared/product.model';
import { BarChartComponent } from '../product-chart/bar-chart.component';
import { ECHARTS_PROVIDER } from '../shared/echarts.config';

@Component({
    standalone: true,
    selector: 'app-product-dashboard',
    imports: [CommonModule, ProductListComponent, ProductDetailComponent, BarChartComponent],
    templateUrl: './product-dashboard.component.html',
    providers: [ECHARTS_PROVIDER]
})
export class ProductDashboardComponent {
    readonly selectedProductId = signal<number | null>(null);
    readonly visibleProducts = signal<Product[]>([]);

    readonly chartData = computed(() =>
        this.visibleProducts().map(p => ({
            name: p.name,
            value: p.totalSales
        }))
    );

    onProductSelected(productId: number) {
        this.selectedProductId.set(productId);
    }

    onProductsChanged(products: Product[]) {
        this.visibleProducts.set(products);
    }
}   