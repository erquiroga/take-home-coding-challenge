import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Product } from '../shared/product.model';
import { provideHttpClient } from '@angular/common/http';

describe('ProductService', () => {
    let service: ProductService;
    let httpMock: HttpTestingController;

    const mockProducts: Product[] = [
        { id: 1, name: 'Test', unitCost: 10, totalSales: 100, description: 'Desc' }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProductService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        service = TestBed.inject(ProductService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpMock.verify());

    it('should fetch products with GET', () => {
        service.getAll().subscribe((products) => {
            expect(products).toEqual(mockProducts);
        });

        const req = httpMock.expectOne('http://localhost:3000/products');
        expect(req.request.method).toBe('GET');
        req.flush(mockProducts);
    });

    it('should fetch a product by ID with GET', () => {
        const mockProduct: Product = {
            id: 1,
            name: 'Test Product',
            unitCost: 10,
            totalSales: 100,
            description: 'A test product'
        };

        service.getById(1).subscribe((product) => {
            expect(product).toEqual(mockProduct);
        });

        const req = httpMock.expectOne('http://localhost:3000/products/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockProduct);
    });

    it('should create a product with POST', () => {
        const newProduct = {
            name: 'New',
            unitCost: 50,
            totalSales: 10,
            description: 'desc'
        };

        const createdProduct = { id: 99, ...newProduct };

        service.create(newProduct).subscribe(product => {
            expect(product).toEqual(createdProduct);
        });

        const req = httpMock.expectOne('http://localhost:3000/products');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newProduct);
        req.flush(createdProduct);
    });
});