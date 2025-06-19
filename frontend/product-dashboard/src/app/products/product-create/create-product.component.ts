import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../shared/product.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-product.component.html'
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  productId: number | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      unitCost: [null, [Validators.required, Validators.min(0.01)]],
      totalSales: [null, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      image: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.productId = +idParam;
      this.isEditMode = true;
      this.loadProduct();
    }
  }

  private loadProduct(): void {
    this.productService.getById(this.productId!).subscribe({
      next: (product: Product) => {
        this.productForm.patchValue(product);
      },
      error: () => {
        this.toastr.error('Failed to load product');
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode) {
      this.productService.update(this.productId!, this.productForm.value).subscribe(() => {
        this.toastr.success('Product successfully updated');
        this.router.navigate(['/']);
      });
    } else {
      this.productService.create(this.productForm.value).subscribe(() => {
        this.toastr.success('Product successfully created');
        this.router.navigate(['/']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}