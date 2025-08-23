import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent  implements OnInit {
  userName: string = '';
  userPhone: string = '';
  cartItems: any[] = [];
  totalAmount: number = 0;
currentDate: Date = new Date();
 environment = environment;
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.authService.name$.subscribe(name => this.userName = name);
    this.authService.phone$.subscribe(phone => this.userPhone = phone);

    this.cartItems = this.cartService.getCart();  
    this.totalAmount = this.cartService.getTotalPrice();  

    
  }

  placeOrder(): void {
  if (this.cartItems.length === 0) {
    alert('Cart empty');
    return;
  }

  const itemsForOrder = this.cartItems.map(item => ({
    productId: item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image
  }));

  this.orderService.placeOrder(itemsForOrder, this.totalAmount, this.userName, this.userPhone).subscribe({
    next: (res) => {
    this.toastr.success('✅ send successful!', 'Success',{positionClass: 'toast-top-right'});
      this.cartService.clearCart();
      this.cartItems = [];
      this.totalAmount = 0;
    },
    error: (err) => {
      this.toastr.success(' send fail !', 'Error');
    }
  });
}

 printOrder(): void {
    window.print();
  }
}
