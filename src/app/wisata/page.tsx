import type { Metadata } from 'next';
import { allWisataData } from '@/data/WisataData';
import WisataClient from '@/components/public/shared/Wisata/WisataClient';

export const metadata: Metadata = {
  title: 'Jelajah Kuliner Garut - Temukan Rasa Khas Kota Intan',
  description: 'Temukan berbagai tempat makan terbaik di Garut, dari makanan berat khas Sunda, kafe hits, hingga oleh-oleh legendaris.',
};

export default function WisataPage() {
  const wisataData = allWisataData;

  return (
    // Render komponen client dan kirim data sebagai props
    <WisataClient data={wisataData} />
  );
}