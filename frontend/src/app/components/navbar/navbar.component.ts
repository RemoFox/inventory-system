import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
 
userName: string = '';
Role: string ='';

  constructor(private authService:AuthService, public router: Router) {

  }

ngOnInit(): void {
   this.authService.role$.subscribe((Role:any) => {
    this.Role = Role;
  });

  this.authService.name$.subscribe(name => {
    this.userName = name;
  });
}

 logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}

isLoggedIn() {
  return this.authService.isLoggedIn(); 
}
}
