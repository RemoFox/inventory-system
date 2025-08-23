import { Injectable } from '@angular/core';
import { ChartItem } from 'chart.js';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/CartItem';


@Injectable({
  providedIn: 'root'
})
export class CartService {

 private cartKey = 'cart';
  private cartItems: CartItem[] = [];

  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const data = localStorage.getItem(this.cartKey);
    this.cartItems = data ? JSON.parse(data) : [];
    this.cartItemsSubject.next(this.cartItems);
    this.updateCartCount();
  }

  private saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    this.cartItemsSubject.next(this.cartItems);
    this.updateCartCount();
  }

  private updateCartCount() {
    const count = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountSubject.next(count);
  }

  getCart(): CartItem[] {
    return [...this.cartItems];
  }

  addToCart(product: any) {
    const index = this.cartItems.findIndex(i => i._id === product._id);
    if (index > -1) {
  
    if (this.cartItems[index].quantity < product.quantity) {
      this.cartItems[index].quantity += 1;
    } else {
      alert('  quantity unavilable ');
    }
  } 
   else {
      this.cartItems.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        stock: product.quantity
      });
    }
    this.saveCart();
  }

  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter(item => item._id !== productId);
    this.saveCart();
  }

  updateQuantity(productId: string, quantity: number) {
    const item = this.cartItems.find(i => i._id === productId);
   if (item && quantity > 0) {
    if (quantity <= item.stock) {
      item.quantity = quantity;
    } else {
      alert(`The maximum quantity is ${item.stock}`);
      item.quantity = item.stock;
    }
  }
}

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
