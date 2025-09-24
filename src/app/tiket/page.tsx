// app/ticket/page.tsx
import type { Metadata } from "next";
import TicketListClient from "@/components/public/shared/Tiket/TicketListClient";

export const metadata: Metadata = {
  title: 'Pesan Tiket Wisata - Nempo Garut',
  description: 'Rencanakan liburan Anda di Garut dengan mudah.',
};

export default function TiketPage() {
  return <TicketListClient />; // tidak kirim data statik lagi
}
