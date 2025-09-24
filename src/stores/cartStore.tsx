"use client";

import { create } from "zustand";
import api from "@/services/api";
import { produce } from "immer";

// ---- Common types ----
interface Culinary {
  id: string;
  name: string;
  category: string;
  description: string | null;
  rating: string | number;
  reviews: number;
  address: string;
  image: string;
  image_url?: string;
  discount?: string | number;
  tax?: string | number;
  created_at: string;
  updated_at: string;
}

export interface CartItemInGroup {
  cart_item_id: number;
  menu_name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface CulinaryGroup {
  type: "KULINER";
  culinary: Culinary;
  items: CartItemInGroup[];
  total_price: number;
  cart_group_id: string;
}

export interface CartSummary {
  subtotal: number;
  service_fee_percent: number;
  service_fee: number;
  total_payment: number;

  applied_coupon?: {
    code: string;
    discount_type: "percent" | "fixed";
    discount_value: number;
    discount_amount: number;
  } | null;
}

export interface TicketGroup {
  type: "TIKET";
  ticket: {
    destination: {
      id: string;
      name: string;
      image?: string;
      image_url?: string;
    };
    visit_date: string;
    qty: { adult: number; child: number };
    price: { adult: number; child: number };
    outbound?: { name: string; price: number; quantity: number }[];
    subtotal: number;
  };
  total_price: number;
  cart_group_id: string;
}

export type CartGroup = CulinaryGroup | TicketGroup;
export type CartResponse = CartGroup[];

export interface PaymentMethod {
  id: string;
  name: string;
  description?: string;
}

// ---- Store ----
interface CartState {
  cartGroups: CartResponse;
  summary: CartSummary | null;
  paymentMethods: PaymentMethod[];
  isLoading: boolean;

  fetchCart: () => Promise<void>;
  addKulinerToCart: (menuId: string, quantity: number) => Promise<void>;
  addTicketToCart: (ticket: {
    destination_id: string;
    visit_date: string;
    qty_adult?: number;
    qty_child?: number;
    price_adult?: number;
    price_child?: number;
    outbound?: { name: string; price: number; quantity: number }[];
  }) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalCost: () => number;
  getTotalItems: () => number;

  applyCoupon: (couponCode: string) => Promise<void>;
  removeCoupon: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartGroups: [],
  summary: null,
  paymentMethods: [],
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/api/cart");
      const cartData = response.data;

      const finalSummary = cartData.summary;

      if (cartData.coupon && finalSummary) {
        finalSummary.applied_coupon = {
          code: cartData.coupon.code,
          discount_amount: finalSummary.discount,
          ...cartData.coupon,
        };
      }

      set({
        cartGroups: cartData.groups ?? [],
        summary: finalSummary ?? null,
        paymentMethods: cartData.payment_methods ?? [],
        isLoading: false,
      });
    } catch (error) {
      console.error("Gagal mengambil data keranjang:", error);
      set({ isLoading: false, cartGroups: [], summary: null, paymentMethods: [] });
    }
  },

  addKulinerToCart: async (menuId, quantity) => {
    try {
      await api.post("/api/cart/kuliner", { menu_id: menuId, quantity });
      await get().fetchCart();
    } catch (error: any) {
      console.error("❌ addKulinerToCart gagal:", error.response?.data || error.message);
      throw error;
    }
  },

  addTicketToCart: async (ticket) => {
    try {
      await api.post("/api/cart/ticket", ticket);
      await get().fetchCart();
    } catch (error) {
      console.error("Gagal menambah tiket ke keranjang:", error);
      throw error;
    }
  },

  removeFromCart: async (cartItemId) => {
    const original = get().cartGroups;
    set(
      produce((state: CartState) => {
        state.cartGroups = state.cartGroups
          .map((group) => {
            if (group.type === "KULINER") {
              const items = group.items.filter((it) => it.cart_item_id !== cartItemId);
              return { ...group, items };
            }
            return group;
          })
          .filter((group) => (group.type === "KULINER" ? group.items.length > 0 : true));
      })
    );

    try {
      await api.delete(`/api/cart/items/${cartItemId}`);
      await get().fetchCart();
    } catch (error) {
      console.error("Gagal menghapus item:", error);
      set({ cartGroups: original });
      throw error;
    }
  },

  clearCart: async () => {
    const original = get().cartGroups;
    set({ cartGroups: [] });
    try {
      await api.delete("/api/cart");
      set({ summary: null, paymentMethods: [] });
    } catch (error) {
      console.error("Gagal mengosongkan keranjang:", error);
      set({ cartGroups: original });
      throw error;
    }
  },

  totalCost: () => get().summary?.total_payment ?? 0,

  getTotalItems: () => {
    return get().cartGroups.reduce((acc, group) => {
      if (group.type === "KULINER") {
        const qty = group.items.reduce((x, it) => x + Number(it.quantity || 0), 0);
        return acc + qty;
      }
      const t = (group.ticket?.qty?.adult ?? 0) + (group.ticket?.qty?.child ?? 0);
      const ob = (group.ticket?.outbound ?? []).reduce((x, o) => x + (o.quantity ?? 0), 0);
      return acc + t + ob;
    }, 0);
  },

  applyCoupon: async (couponCode) => {
    try {
      await api.post("/api/cart/apply-coupon", { coupon_code: couponCode });
      await get().fetchCart();
    } catch (error: any) {
      console.error("❌ applyCoupon gagal:", error.response?.data || error.message);
      throw error;
    }
  },

  removeCoupon: async () => {
    try {
      await api.post("/api/cart/remove-coupon");
      await get().fetchCart();
    } catch (error: any) {
      console.error("❌ removeCoupon gagal:", error.response?.data || error.message);
      throw error;
    }
  },
}));
