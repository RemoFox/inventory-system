import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService { 

private apiUrl = `${environment.apiUrl}/api/products`
 
  constructor(private http:HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data, );
  }

  updateProduct(id:string, data: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`,data);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
