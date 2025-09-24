import CartClient from "@/components/public/shared/cart/CartClient";
import type { Metadata } from "next";

export const metadata: Metadata = { 
    title: 'Keranjang Belanja - Nempo Garut',
    description: 'Review pesanan Anda sebelum melanjutkan ke pembayaran.'
};

export default function CartPage() {
  return <CartClient />;
}