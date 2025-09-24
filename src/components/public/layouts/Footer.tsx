// Wajib ada di paling atas karena ada interaksi & animasi
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import { ArrowRight, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {

  // Fungsi untuk membuka WhatsApp
  const openWhatsApp = () => {
    const phoneNumber = "6281234567890"; // Ganti dengan nomor WhatsApp tujuan
    const message = "Halo Nempo Garut, saya tertarik untuk berkolaborasi!";
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
    { name: 'Youtube', icon: Youtube, url: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-white">
      {/* 1. CTA Section (dari kodemu) */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-[#3b82f6] to-[#14b8a6]">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-6 md:space-y-8 text-white"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <span className="shimmer-text">Siap Menjelajahi Garut?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              Bergabunglah dengan ribuan wisatawan yang telah merasakan pengalaman tak terlupakan di Garut. Hayu, buat momen spesialmu sekarang juga!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="contained"
                size="large"
                onClick={openWhatsApp} // Kembalikan ke fungsi onClick
                endIcon={<ArrowRight />}
                sx={{
                  backgroundColor: 'white',
                  color: '#2563eb', // Warna biru primer
                  borderRadius: '9999px',
                  textTransform: 'none',
                  
                  padding: '12px 32px',
                  fontWeight: '600',
                  '&:hover': {
                    backgroundColor: '#f3f4f6', // Warna abu-abu muda
                    transform: 'scale(1.05)',
                  },
                  transition: 'transform 0.2s ease-in-out',
                }}
              >
                Hubungi Kami
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
{/* 
      <div className="bg-gray-900 text-gray-300">
        <div className="container mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/Assets/Logo/Logo-2.png" alt="Nempo Garut Logo" width={40} height={40} />
              <span className="font-bold text-xl text-white">Nempo Garut</span>
            </Link>
            <p className="text-sm">Platform digital untuk menemukan pesona wisata, kuliner, dan budaya Garut.</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/wisata" className="hover:text-white">Wisata</Link></li>
              <li><Link href="/kuliner" className="hover:text-white">Kuliner</Link></li>
              <li><Link href="/event" className="hover:text-white">Event</Link></li>
              <li><Link href="/berita" className="hover:text-white">Berita</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Lainnya</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/kontak" className="hover:text-white">Kontak Kami</Link></li>
              <li><Link href="/kebijakan-privasi" className="hover:text-white">Kebijakan Privasi</Link></li>
              <li><Link href="/syarat-ketentuan" className="hover:text-white">Syarat & Ketentuan</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Ikuti Kami</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="container mx-auto py-4 px-6 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Nempo Garut. All Rights Reserved.</p>
          </div>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;