// Patisserie Postcard: persistent cart state is the single client-side source of pricing and quantity truth.
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculateSubtotal } from "../lib/orderMath";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existing = state.items.find((entry) => entry.lineId === item.lineId);
        return existing
          ? { items: state.items.map((entry) => entry.lineId === item.lineId ? { ...entry, quantity: entry.quantity + item.quantity } : entry) }
          : { items: [...state.items, item] };
      }),
      updateQuantity: (lineId, quantity) => set((state) => ({ items: state.items.map((item) => item.lineId === lineId ? { ...item, quantity: Math.max(1, quantity) } : item) })),
      removeItem: (lineId) => set((state) => ({ items: state.items.filter((item) => item.lineId !== lineId) })),
      clearCart: () => set({ items: [] }),
      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: () => calculateSubtotal(get().items),
    }),
    { name: "cakely-cart" },
  ),
);
