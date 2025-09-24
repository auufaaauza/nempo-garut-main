// File: src/app/page.tsx (atau file homepage Anda)

import Banner from "@/components/public/shared/Home/Kupon/Banner";
import HeroSection from "@/components/public/shared/Home/HeroSection";
import WeatherSection from "@/components/public/shared/Home/WeatherSection";
import FunFactsSection from "@/components/public/shared/Home/FunFactsSection";
import Welcome from "@/components/public/shared/Home/WelcomeSection";
import KuponSlider from "@/components/public/shared/Home/Kupon/KuponSlider"
import Wisatarated from "@/components/public/shared/Home/Wisata";
import Kulinerrated from "@/components/public/shared/Home/Kuliner";
import Footer from "@/components/public/layouts/Footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Menggunakan teks langsung karena metadata object tidak bisa menggunakan hooks seperti t()
  title: "Nempo Garut: Wisata, Kuliner, & Info Lengkap Kota Intan",
  description: "Portal informasi terlengkap untuk wisata, kuliner, event, dan komunitas di Garut, Jawa Barat. Temukan pesona Kota Intan bersama Nempo Garut.",
  
  // Keywords diubah menjadi format array
  keywords: [
    'Nempo Garut', 
    'wisata Garut', 
    'kuliner Garut', 
    'event Garut', 
    'komunitas Garut', 
    'budaya Sunda', 
    'berita Garut', 
    'Garut'
  ],
  
  // openGraph untuk media sosial (Facebook, WhatsApp, dll)
  openGraph: {
    title: "Nempo Garut: Wisata, Kuliner, & Info Lengkap Kota Intan",
    description: "Portal informasi terlengkap untuk wisata, kuliner, event, dan komunitas di Garut.",
    type: 'website',
    url: 'https://www.nempogarut.com',
    images: [
      {
        url: 'https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto/Logo/Logo%202.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvL0xvZ28vTG9nbyAyLnBuZyIsImlhdCI6MTc1NjE1NzA2MiwiZXhwIjoxODE5MjI5MDYyfQ.nqsLBccaeKYy5QuASWw_bt2C2yxvGHPdH4LZdisw8Ag',
        width: 800, // Tambahkan dimensi gambar jika diketahui
        height: 600,
        alt: 'Logo Nempo Garut',
      },
    ],
  },
  
  // Twitter card untuk pratinjau di Twitter
  twitter: {
    card: 'summary_large_image',
    title: "Nempo Garut: Wisata, Kuliner, & Info Lengkap Kota Intan",
    description: "Portal informasi terlengkap untuk wisata, kuliner, event, dan komunitas di Garut.",
    images: ['https://tctwqzqjkovbfibybohg.supabase.co/storage/v1/object/sign/Foto/Logo/Logo%202.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZDg5MzE5My03MGFiLTQ3NTUtODZjZS1lMTY4MTc0YjE2YWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGb3RvL0xvZ28vTG9nbyAyLnBuZyIsImlhdCI6MTc1NjE1NzA2MiwiZXhwIjoxODE5MjI5MDYyfQ.nqsLBccaeKYy5QuASWw_bt2C2yxvGHPdH4LZdisw8Ag'],
  },
};


export default function Home() {
  return (
    <div className="min-h-screen">
      <Banner/>
      <HeroSection />
      <WeatherSection />
      <Welcome />
      <KuponSlider />
      <section className="pb-8 md:pb-12">
        <FunFactsSection />
      </section>
      <section className="pb-8 md:pb-12">
        <Wisatarated />
      </section>
      <section className="pb-8 md:pb-12">
        <Kulinerrated />
      </section>
      <Footer />
    </div>
  );
}