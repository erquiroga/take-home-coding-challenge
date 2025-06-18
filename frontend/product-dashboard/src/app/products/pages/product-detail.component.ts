import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnChanges {
  @Input() productId!: number;

  product: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnChanges(): void {
    if (this.productId) {
      this.productService.getById(this.productId).subscribe({
        next: (product) => (this.product = product),
        error: () => (this.product = null)
      });
    }
  }
}