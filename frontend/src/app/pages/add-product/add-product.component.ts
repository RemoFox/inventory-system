import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit{
  productForm!: FormGroup;
  selectedFile!: File;
  categories: any[] = [];
   Role!:string

  constructor(private fb: FormBuilder,
     private productService: ProductService,
      private router: Router,
     private categoryService: CategoryService,  private authService:AuthService,
     private toastr: ToastrService) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [ , [Validators.required, Validators.min(0)]],
      quantity: [ , [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
  
    });

   this.categoryService.getCategories().subscribe({
   next: (res) => {
    this.categories = res;
   
    console.log('📦 catagory:', this.categories);
  },
  error: (err) =>  console.log('📦 catagory:', err)
});


this.authService.role$.subscribe((role:any)=>{
    this.Role = role
  })

  }

onFileSelected(event: any): void {
  this.selectedFile = event.target.files[0];
}


  onSubmit(): void {
    if (this.productForm.invalid || !this.selectedFile) return;

    const formData = new FormData();
    formData.append('name', this.productForm.value.name);           
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price);
    formData.append('quantity', this.productForm.value.quantity);
     formData.append('category', this.productForm.value.category); 
    formData.append('image', this.selectedFile);

    this.productService.createProduct(formData).subscribe({
      next: () => {
        this.productForm.reset();
        this.selectedFile = null!;
         this.toastr.success('✅ added successful!', 'Success',{positionClass: 'toast-top-right'});
        setTimeout(() => this.router.navigate(['/products']), 1000);
      },
      error: (err) => {
       this.toastr.success('❌ added fail !', 'Error')
      }
    });
  }

  isLoggedIn() {
  return this.authService.isLoggedIn(); 
}

}

