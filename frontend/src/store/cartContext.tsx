import { type ReactNode, useEffect, useReducer } from 'react';
import { CartContext } from '../contexts/cartContext';
import type { CartItem, Product } from '../types';

/* ===== ACTION TYPES ===== */
type CartAction =
  | { type: 'ADD_TO_CART'; payload: { item: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { itemId: number } }
  | { type: 'CLEAR_CART' };

/* ===== REDUCER ===== */
const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { item, quantity } = action.payload;
      const existing = state.find((product) => product.productId === item.productId);

      if (existing) {
        return state.map((product) =>
          product.productId === item.productId
            ? { ...product, quantity: product.quantity + quantity }
            : product,
        );
      }

      return [...state, { ...item, quantity }];
    }

    case 'REMOVE_FROM_CART':
      return state.filter((product) => product.productId !== action.payload.itemId);

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

/* ===== INIT LOCAL STORAGE ===== */
const getInitialCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, dispatch] = useReducer(cartReducer, [], getInitialCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  /* Actions */
  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_TO_CART', payload: { item: product, quantity } });
  };

  const removeFromCart = (itemId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { itemId } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalQuantity = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
