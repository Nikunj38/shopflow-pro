import React, { createContext, useContext, useState, useCallback } from "react";
import { CartItem, Product } from "@/data/products";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variantId: string) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, variantId: string) => {
    const variant = product.variants.find(v => v.id === variantId);
    if (!variant || variant.outOfStock || variant.stock <= 0) return;

    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.variantId === variantId);
      if (existing) {
        if (existing.quantity >= variant.stock) return prev;
        return prev.map(i =>
          i.product.id === product.id && i.variantId === variantId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, variantId, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, variantId: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.variantId === variantId)));
  }, []);

  const updateQuantity = useCallback((productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => !(i.product.id === productId && i.variantId === variantId)));
    } else {
      setItems(prev => prev.map(i =>
        i.product.id === productId && i.variantId === variantId
          ? { ...i, quantity }
          : i
      ));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => {
    const variant = i.product.variants.find(v => v.id === i.variantId);
    return sum + (variant?.price || 0) * i.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
