import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router:Router ,private toastr: ToastrService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user'] ,
      phone:['',Validators.required]
    });
  }
  
  onSubmit() {
    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.registerForm.reset();
        this.toastr.success('✅ Register successful!', 'Success',{positionClass: 'toast-top-right'});
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toastr.success('✅ Register fail !', 'Error');
      }
    });
  }
}
