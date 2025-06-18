import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-product.component.html'
})
export class CreateProductComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      unitCost: [null, [Validators.required, Validators.min(0.01)]],
      totalSales: [null, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      image: [''] // optional field
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.create(this.productForm.value).subscribe(() => {
        this.router.navigate(['/']); // back to product list
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}