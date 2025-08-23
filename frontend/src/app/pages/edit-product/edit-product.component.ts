import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit{
productForm!:FormGroup;
product!:any;
productId!:string;
selectedFile!:File;
categories: any[] = [];
Role!:string;
 environment = environment;
constructor(private fb:FormBuilder ,private route:ActivatedRoute ,
   private router:Router, private productService:ProductService, 
     private categoryService: CategoryService, 
     private toastr: ToastrService,
      private authService:AuthService){}

ngOnInit(): void {
  this.productId = this.route.snapshot.paramMap.get('id')|| '';
  this.productForm = this.fb.group({
    name:['',Validators.required],
    description:[''],
    price:[ ,[Validators.required,Validators.min(0)]],
    quantity:[ ,[Validators.required,Validators.min(0)]],
    category: ['', Validators.required]
  });
  
this.categoryService.getCategories().subscribe({
      next: (cats) => (this.categories = cats),
      error: (err) => console.error('❌ Error loading categories:', err)
    });

  this.productService.getProduct(this.productId).subscribe((product)=>{
     this.product = product; 
     this.productForm.patchValue(product)
  })

  this.authService.role$.subscribe((role:any)=>{
    this.Role = role
  })
}

onFileSelected(event:any){
  this.selectedFile = event.target.files[0];
}

onSubmit():void{
const formData = new FormData();
formData.append('name',this.productForm.value.name);
formData.append('description',this.productForm.value.description);
formData.append('price',this.productForm.value.price);
formData.append('quantity',this.productForm.value.quantity);
 formData.append('category', this.productForm.value.category);
 if(this.selectedFile){
  formData.append('image',this.selectedFile);
 };

 this.productService.updateProduct(this.productId, formData).subscribe({
  next:()=> {
    this.toastr.success('✅ update successful!', 'Success',{positionClass: 'toast-top-right'}),
     this.router.navigate(['/products']);
       },
  error:(err) => {  this.toastr.error(' update fail !', 'Error');}
})

}

isLoggedIn() {
  return this.authService.isLoggedIn(); 
}

}
