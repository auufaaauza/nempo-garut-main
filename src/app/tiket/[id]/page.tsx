// tiket/[id]/page.tsx
import TicketDetailClient from "@/components/public/shared/Tiket/TicketDetailClient";
import { getDestinationById } from "@/lib/data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

/**
 * Make this a dynamic route by removing generateStaticParams
 * This allows the page to be rendered on-demand
 */

/**
 * Fungsi untuk generate metadata dinamis (bagus buat SEO)
 */
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const destination = await getDestinationById(params.id);
    if (!destination) {
      return { title: "Destinasi Tidak Ditemukan" };
    }
    return {
      title: `Pesan Tiket ${destination.name} - Nempo Garut`,
      description: destination.description,
    };
  } catch (error) {
    return { title: "Destinasi Tidak Ditemukan" };
  }
}

/**
 * Halaman server untuk menampilkan SATU detail tiket.
 */
export default async function TiketDetailPage({ params }: { params: { id: string } }) {
  // Ambil data dari API di sisi server
  const destination = await getDestinationById(params.id);

  // Kalo datanya gak ada, tampilkan halaman 404
  if (!destination) {
    notFound();
  }

  // Render komponen client dengan data yang sudah siap
  return <TicketDetailClient destination={destination} />;
}