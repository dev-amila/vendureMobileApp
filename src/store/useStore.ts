import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import {  StoreState} from "../utils/interface";


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
        name: "ecommerce-store", // localStorage key
      }
    )
  )
);
