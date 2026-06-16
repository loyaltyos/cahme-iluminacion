"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { productById, type Product } from "@/lib/products";

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  detailedItems: Array<CartItem & { product: Product }>;
  itemCount: number;
  subtotal: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "camhe-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, ready]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { productId, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = productById.get(item.productId);
          return product ? { ...item, product } : null;
        })
        .filter(Boolean) as Array<CartItem & { product: Product }>,
    [items]
  );

  const subtotal = detailedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({
      items,
      detailedItems,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      clearCart
    }),
    [items, detailedItems, itemCount, subtotal, addItem, removeItem, setQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
