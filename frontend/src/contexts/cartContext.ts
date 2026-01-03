import { createContext, useContext } from 'react';
import { type CartContextType } from '../types';

/* ===== CART CONTEXT ===== */
export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
};
