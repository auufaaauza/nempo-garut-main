import MyOrdersClient from "@/components/public/shared/Orders/MyOrdersClient";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Riwayat Pesanan - Nempo Garut',
  description: 'Lihat semua riwayat pesanan Anda.',
};

export default function PesananSayaPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyOrdersClient />
    </Suspense>
  );
}