export interface Order {
  orderId: number;
  status: 'CONFIRMED' | 'CREATED' | 'CANCELLED';
  totalPrice: number;
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  imageUrl: string;
}
