import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
categoryList:any[]=[];
Role!:string
constructor(private category:CategoryService,private toastr: ToastrService
  ,private authService:AuthService
  , private router:Router){

}

ngOnInit(): void {
   this.category.getCategories().subscribe({
      next: (cats) => this.categoryList = cats,
      
    });

    this.authService.role$.subscribe((role:any)=>{
    this.Role = role
  })
}

onDelete(id:string){
this.category.delete(id).subscribe({
next:(res)=>{ 
        this.categoryList = this.categoryList.filter(p => p._id !== id);
   this.toastr.success('✅ delete successful!', 'Success',{positionClass: 'toast-top-right'});
        this.router.navigate(['/category-list']);},
error:(err)=>{
this.toastr.error('❌ delete fail !', 'Error');
}
})

}

isLoggedIn() {
  return this.authService.isLoggedIn(); 
}

}
