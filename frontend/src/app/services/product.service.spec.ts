import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:5000/api/products';

  const mockProduct: Product = {
    _id: '1',
    name: 'Product 1',
    price: 100,
    quantity: 10,
    description: 'Test product 1',
    image: 'image1.jpg',
    category: { _id: 'cat1', name: 'Category 1' },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
//------------------------------------------------------------------t1
  it('should get all products', () => {
    const mockProducts: Product[] = [mockProduct];

    service.getAllProducts().subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });
//------------------------------------------------------------------t2
  it('should get a product by ID', () => {
    service.getProduct('1').subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });
//------------------------------------------------------------------t3
  it('should create a product', () => {
    const formData = new FormData();
    formData.append('name', mockProduct.name);

    service.createProduct(formData).subscribe((response) => {
      expect(response).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockProduct);
  });
//------------------------------------------------------------------t4
  it('should update a product', () => {
    const updatedProduct = { ...mockProduct, name: 'Updated Product' };
    const formData = new FormData();
    formData.append('name', updatedProduct.name);

    service.updateProduct('1', formData).subscribe((response) => {
      expect(response).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProduct);
  });
//------------------------------------------------------------------t5
  it('should delete a product', () => {
    service.deleteProduct('1').subscribe((response) => {
      expect(response).toEqual({ message: 'Deleted successfully' });
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Deleted successfully' });
  });
});
