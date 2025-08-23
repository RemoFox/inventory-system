export interface OrderItem {  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
}
