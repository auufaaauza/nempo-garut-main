"use client";
import React from 'react';
import { motion } from 'framer-motion';
// import Link from 'next/link'; // Removed to resolve error
// import Image from 'next/image'; // Removed to resolve error
import { MapPin, Star } from 'lucide-react';
import type { Destination } from '@/data/DestinationData';
import { Button } from '@/components/ui/button'; // Menggunakan Button dari component/ui

// Changed from motion(Link) to motion.a to use a standard anchor tag
const MotionLink = motion.a;

const TicketCard = ({ destination }: { destination: Destination }) => {
  const imgSrc =
    destination.image ||
    "/images/placeholder1.jpg"; // fallback if image is null

  const startPrice =
    destination.prices?.weekday?.adult != null  
      ? destination.prices.weekday.adult
      : 0;

  return (
    // Container utama, memastikan tinggi card konsisten saat dalam grid/flexbox
    <MotionLink
      href={`/tiket/${destination.id}`}
      // layoutId prop might not work as expected without Next.js router context, but keeping for framer-motion's animation intent
      layoutId={`card-${destination.id}`}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group flex flex-col h-full no-underline"
    >
      {/* Bagian gambar, tingginya disamakan dengan KulinerCard (h-72) */}
      <div className="relative h-72">
        {/* Replaced Next.js Image with standard <img> tag */}
        <img
          src={imgSrc}
          alt={destination.name}
          style={{ objectFit: "cover" }}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Menambahkan overlay gradien agar konsisten & teks lebih mudah terbaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {/* Badge rating, styling disamakan dengan KulinerCard */}
        <div className="absolute top-3 right-3 bg-black/50 text-white text-sm font-bold rounded-full px-3 py-1.5 flex items-center gap-1.5 backdrop-blur-sm shadow-md">
          <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
          <span>{destination.rating}</span>
        </div>
      </div>

      {/* Bagian konten, padding disamakan (p-5) dan strukturnya sedikit disesuaikan */}
      <div className="p-5 flex flex-col flex-grow text-black">
        <span
          className="text-xs font-bold text-primary uppercase tracking-wider mb-1"
        >
          {destination.category}
        </span>

        <h3
          className="text-lg font-bold mb-2 truncate group-hover:text-primary transition-colors"
        >
          {destination.name}
        </h3>

        {/* Div ini akan mendorong semua elemen di bawahnya ke bagian paling bawah card */}
        <div className="mt-auto">
          <div
            className="flex items-start text-gray-500 text-sm"
          >
            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">{destination.location}</span>
          </div>

          {/* Bagian harga & tombol, sekarang dipisahkan dengan garis tipis di atasnya */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs text-gray-500">
                  Mulai dari
                </span>
                <p className="font-bold text-primary">
                  Rp {startPrice.toLocaleString("id-ID")}
                </p>
              </div>
              {/* Tombol diperbaiki dengan variant outline dan size yang sesuai */}
              <Button variant="default" size="sm">
                Lihat Detail
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MotionLink>
  );
};

export default TicketCard;

