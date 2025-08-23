import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router,
    private toastr: ToastrService)
     {
    this.loginForm = this.fb.group({
      email: ['remon@123456.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
         //localStorage.setItem('token', res.token);
        this.authService.saveToken(res.token);
          console.log('Login done!');
          this.toastr.success('✅ login successful!', 'Success',{positionClass: 'toast-top-right'});
         this.router.navigate(['/home']);

      },
      error: (err) => {
        this.toastr.success(' login fail !','Error');
      }
    });
  }





}
