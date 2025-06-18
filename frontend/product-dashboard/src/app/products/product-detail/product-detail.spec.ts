import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from '../shared/product.service';
import { of } from 'rxjs';
import { Product } from '../shared/product.model';

@Component({
  standalone: true,
  imports: [ProductDetailComponent],
  template: `<app-product-detail [productId]="productId" />`
})
class TestHostComponent {
  productId = 1;
}

describe('ProductDetailComponent via HostComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    unitCost: 100,
    totalSales: 500,
    description: 'Test Description'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getById: () => of(mockProduct)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render product details', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Product');
    expect(compiled.textContent).toContain('Test Description');
    expect(compiled.textContent).toContain('500');
  });
});