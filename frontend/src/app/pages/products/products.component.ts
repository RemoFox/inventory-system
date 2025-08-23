import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { CartService } from 'src/app/services/cart.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  errorMsg = '';
  Role = '';
 allProducts: Product[] = [];
  categories: any[] = [];
  selectedCategoryId: string = '';
  searchQuery: string = '';
  @Input() product!: Product;//cart
  cartCount$!: Observable<number>;
 environment = environment;
  constructor(private productService: ProductService,
    private authService:AuthService,
    private categoryService: CategoryService,
  private cartService: CartService) {}

  ngOnInit(): void {

    this.authService.role$.subscribe((Role:any) => {
    this.Role = Role;
  });

    this.loadData();

    this.cartCount$ = this.cartService.cartCount$;
  }


  loadData(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts = res;
        this.products = res;
         this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });

     this.categoryService.getCategories().subscribe({
      next: (cats) => this.categories = cats,
      error: () => this.errorMsg = '  Failed to load categories ❌'
    });

  }

filterByCategory(): void {
    if (this.selectedCategoryId) {
      this.products = this.allProducts.filter(p => p.category?._id === this.selectedCategoryId);
    } else {
      this.products = [...this.allProducts];
    }
  }

  onDelete(id: string) {
    if(confirm('are you shure')){
     this.productService.deleteProduct(id).subscribe({
      next:()=>{
        this.products = this.products.filter(p => p._id !== id);
          this.allProducts = this.allProducts.filter(p => p._id !== id);
      },
      error(error){
        console.error(error)
      }
     })
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

isLoggedIn() {
  return this.authService.isLoggedIn(); 
}

applyFilters() {
  const query = this.searchQuery.trim().toLowerCase();
  this.products = this.allProducts.filter(product => {
    const matchCategory = this.selectedCategoryId === '' || product.category?._id === this.selectedCategoryId;
    const matchSearch = product.name.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });
}

onCategoryChange() {
  this.applyFilters();
}

onSearch() {
  this.applyFilters();
}
}
