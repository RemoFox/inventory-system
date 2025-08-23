import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/CartItem';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
 environment = environment;
  constructor(private cartService: CartService,private productService:ProductService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  // loadCart() {
  //   this.cartItems = this.cartService.getCart();
  //   this.total = this.cartService.getTotalPrice();
  // }


loadCart() {
  const cart = this.cartService.getCart();

  this.productService.getAllProducts().subscribe(products => {
    this.cartItems = cart.map(item => {
      const prod = products.find(p => p._id === item._id);
      return {
        ...item,
        stock: prod ? prod.quantity : 0 
      };
    });

    this.total = this.cartService.getTotalPrice();
  });
}


  removeItem(id: string) {
    this.cartService.removeFromCart(id);
    this.loadCart();
  }
  onQuantityChange(event: Event, id: string) {
  const input = event.target as HTMLInputElement;
  const value = input.valueAsNumber;
  this.updateQuantity(id, value);
}
  updateQuantity(id: string, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(id, quantity);
      this.loadCart();
    }
  }






}

