import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { StoreState } from "../utils/interface";

const secureStorage = {
	getItem: async (name: string): Promise<string | null> => {
		try {
			const value = await SecureStore.getItemAsync(name);
			return value ?? null;
		} catch {
			return null;
		}
	},
	setItem: async (name: string, value: string): Promise<void> => {
		await SecureStore.setItemAsync(name, value);
	},
	removeItem: async (name: string): Promise<void> => {
		await SecureStore.deleteItemAsync(name);
	},
};

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        // Auth
        isLoggedIn: false,
        user: null,
        login: (user) => set({ user, isLoggedIn: true }),
        setIsLoggedIn: (loggedIn:boolean) => set({ isLoggedIn: loggedIn }),
        logout: () => set({ user: null, isLoggedIn: false, cart: [] }),

        // Cart
        cart: [],
        addToCart: (item) => {
          const existing = get().cart.find((i) => i.id === item.id);
          if (existing) {
            set({
              cart: get().cart.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            });
          } else {
            set({ cart: [...get().cart, item] });
          }
        },
        removeFromCart: (id) =>
          set({ cart: get().cart.filter((item) => item.id !== id) }),
        clearCart: () => set({ cart: [] }),
        getCartTotal: () =>
          get().cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ),
      }),
      {
        name: "ecommerce-store",
        storage: createJSONStorage(() => secureStorage),
      }
    )
  )
);
