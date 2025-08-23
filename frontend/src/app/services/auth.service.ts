import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl:String =`${environment.apiUrl}/api/auth`;
  private userId: string = '';
  private userName: string = '';
  private userRole: string = '';
  private userPhone:string= '';

private nameSubject = new BehaviorSubject<string>('');
name$ = this.nameSubject.asObservable();

private roleSubject = new BehaviorSubject<string>('');
role$ = this.roleSubject.asObservable();

private phoneSubject = new BehaviorSubject<any>('');
phone$ = this.phoneSubject.asObservable();

constructor(private http:HttpClient) { 

     this.loadUserFromToken();

}

  login(
    credrntails:{
      email:string;
      password:string;
    }
  ):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,credrntails)
  };

  register(userData: {
  name: string;
  email: string;
  password: string;
  role?: string;
  phone:string
}): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, userData);
}



saveToken(token: string) {
    localStorage.setItem('token', token);
    this.decodeToken(token);
  }


  decodeToken(token: string) {
    try {
      const decoded: any = jwtDecode(token);
      this.userRole = decoded.role;
      this.userName = decoded.name;
      this.userId = decoded.id;
      this.userPhone=decoded.phone;
      this.roleSubject.next(this.userRole);
      this.nameSubject.next(this.userName);
      this.phoneSubject.next(this.userPhone);
  
    } 
    catch (error) {
      console.error('Invalid token');
    }
  }


loadUserFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodeToken(token);
     
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.userRole = '';
    this.userId = '';
    this.roleSubject.next('');
    this.nameSubject.next('')

  }

  isLoggedIn():boolean {
    return !!localStorage.getItem('token');
  }


 getUserCount():Observable<any> {
return this.http.get<any>(`${this.apiUrl}/count`)
 }




}
