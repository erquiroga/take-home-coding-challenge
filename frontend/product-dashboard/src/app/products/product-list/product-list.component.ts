import { Component, effect, signal, computed, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  readonly products = signal<Product[]>([]);
  readonly searchTerm = signal('');
  readonly sortColumn = signal<keyof Product>('id');
  readonly sortDirection = signal<'asc' | 'desc'>('asc');
  readonly showFilters = signal(false);

  readonly unitCostOperator = signal<'gt' | 'lt'>('gt');
  readonly unitCostValue = signal<number | null>(null);
  readonly totalSalesOperator = signal<'gt' | 'lt'>('gt');
  readonly totalSalesValue = signal<number | null>(null);

  readonly filteredProducts = computed(() => {
    let filtered = this.products().filter(p =>
      p.name.toLowerCase().includes(this.searchTerm().toLowerCase())
    );

    if (this.unitCostValue() !== null) {
      filtered = filtered.filter(p =>
        this.unitCostOperator() === 'gt'
          ? p.unitCost > this.unitCostValue()!
          : p.unitCost < this.unitCostValue()!
      );
    }

    if (this.totalSalesValue() !== null) {
      filtered = filtered.filter(p =>
        this.totalSalesOperator() === 'gt'
          ? p.totalSales > this.totalSalesValue()!
          : p.totalSales < this.totalSalesValue()!
      );
    }

    return this.sortProducts(filtered);
  });

  @Output() productSelected = new EventEmitter<number>();
  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products.set(data),
    });
  }

  toggleFilters(): void {
    this.showFilters.update(v => !v);
  }

  clearFilters(): void {
    this.unitCostOperator.set('gt');
    this.unitCostValue.set(null);
    this.totalSalesOperator.set('gt');
    this.totalSalesValue.set(null);
  }

  setSort(column: keyof Product): void {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  sortProducts(products: Product[]): Product[] {
    return [...products].sort((a, b) => {
      const col = this.sortColumn();
      const aValue = a[col];
      const bValue = b[col];

      if (['id', 'unitCost', 'totalSales'].includes(col)) {
        return this.sortDirection() === 'asc'
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortDirection() === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }

  trackById(index: number, product: Product): number {
    return product.id;
  }

  logProduct(product: Product): void {
    this.productSelected.emit(product.id);
  }
}