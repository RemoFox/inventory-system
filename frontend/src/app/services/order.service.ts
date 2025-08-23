import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

private apiUrl = `${environment.apiUrl}/api/orders`;

  constructor(private http: HttpClient) { }

  placeOrder(items: any[], totalAmount: number, customerName: string, customerPhone: string): Observable<any> {
    const orderData = { items, totalAmount, customerName, customerPhone };
    return this.http.post(`${this.apiUrl}/place-order`, orderData);
  }

  getUserOrders() {
  return this.http.get<{orders: Order[], count: number}>(`${this.apiUrl}/my-orders`);
}

}
