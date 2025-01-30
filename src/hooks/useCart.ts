import { useState, useEffect } from 'react';
import type { CartItem } from '../types';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(items => {
      const existingItem = items.find(i => i.id === item.id);
      if (existingItem) {
        return items.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...items, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(items =>
      quantity === 0
        ? items.filter(item => item.id !== id)
        : items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return {
    cartItems,
    addToCart,
    updateQuantity,
    clearCart,
  };
}