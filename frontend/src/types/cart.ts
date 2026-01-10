import type { Product } from './products';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalPrice: number;
}
