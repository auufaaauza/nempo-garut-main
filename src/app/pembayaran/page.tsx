import PaymentClient from "@/components/public/shared/Payment/PaymentClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Selesaikan Pembayaran - Nempo Garut',
  description: 'Lanjutkan pembayaran pesanan Anda dengan aman dan mudah.',
};

// Gunakan 'force-dynamic' agar halaman ini tidak di-cache statis
export const dynamic = 'force-dynamic';

export default function PaymentPage() {
  return <PaymentClient />;
}