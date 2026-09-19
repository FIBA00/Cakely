// Patisserie Postcard: small preference state is persistent; server data stays inside service calls and queries.
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    set => ({
      user: null,
      favorites: ["raspberry-veil"],
      setUser: user => set({ user }),
      logout: () => set({ user: null }),
      toggleFavorite: cakeId =>
        set(state => ({
          favorites: state.favorites.includes(cakeId)
            ? state.favorites.filter(id => id !== cakeId)
            : [...state.favorites, cakeId],
        })),
    }),
    { name: "cakely-app" }
  )
);
