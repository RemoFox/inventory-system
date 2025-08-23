import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit{
categoryForm!:FormGroup
Role!:string

constructor(private fb:FormBuilder ,
  private router:Router ,
   private toastr: ToastrService,
   private CategoryService:CategoryService,
  private authService:AuthService)
{
this.categoryForm=this.fb.group({
  name:['',Validators.required]
})
}

ngOnInit(): void {
  this.authService.role$.subscribe((role:any)=>{
    this.Role = role
  })
}

isLoggedIn() {
  return this.authService.isLoggedIn(); 
}

 onSubmit(){
  this.CategoryService.create(this.categoryForm.value).subscribe({
      next: (res) => {
        this.categoryForm.reset();
        this.toastr.success('✅ added successful!', 'Success',{positionClass: 'toast-top-right'});
        this.router.navigate(['/category-list']);
      },
      error: (err) => {
        this.toastr.success('❌ added fail !', 'Error');
      }
    });
 }

}
