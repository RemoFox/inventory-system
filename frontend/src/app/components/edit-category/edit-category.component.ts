import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit{
categoryForm!: FormGroup;
categoryId!: string;
Role!:string
constructor(
  private categoryService: CategoryService,
  private route: ActivatedRoute,
  private fb: FormBuilder,
  private router:Router,
    private authService:AuthService
) {}

ngOnInit(): void {
  this.getcategoryId();
}

getcategoryId() {
  this.categoryId = this.route.snapshot.paramMap.get('id')!;
  
  this.categoryForm = this.fb.group({
    name: ['', Validators.required],
  });

  this.categoryService.getById(this.categoryId).subscribe(data => {
    this.categoryForm.patchValue({
      name: data.name
    });
  });

    this.authService.role$.subscribe((role:any)=>{
    this.Role = role
  })
}

onSubmit(){
  this.categoryService.update(this.categoryId,this.categoryForm.value).subscribe({
    next:()=> this.router.navigate(['/category-list']),
  error: (err) => console.error('❌ Error updating product:', err)
})
}

isLoggedIn() {
  return this.authService.isLoggedIn(); 
}


}
