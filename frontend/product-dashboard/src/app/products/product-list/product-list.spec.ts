import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../shared/product.service';
import { of } from 'rxjs';
import { Product } from '../shared/product.model';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProducts: Product[];

  beforeEach(async () => {
    mockProducts = [
      { id: 1, name: 'Product 1', unitCost: 10, totalSales: 100, description: 'Test 1' },
      { id: 2, name: 'Product 2', unitCost: 20, totalSales: 200, description: 'Test 2' },
    ];

    await TestBed.configureTestingModule({
      imports: [ProductListComponent, FormsModule],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getAll: () => of(mockProducts)
          }
        },
        provideRouter([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render product rows after fetching', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockProducts.length);
  });
});
