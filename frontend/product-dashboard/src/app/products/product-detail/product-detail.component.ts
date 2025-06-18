import { Component, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  // New reactive input for productId
  productId = input.required<number>();
  product: Product | null = null;

  constructor(private productService: ProductService) {
    // New effect to fetch product details when productId changes
    effect(() => {
      const id = this.productId();
      this.productService.getById(id).subscribe({
        next: (p) => (this.product = p),
        error: () => (this.product = null)
      });
    });
  }
}