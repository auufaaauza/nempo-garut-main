"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type CulinaryItem } from "@/hooks/useCulinaries"; 

interface KulinerCardProps {
  item: CulinaryItem;
  index: number;
  activeCategory: string;
}

const KulinerCard: React.FC<KulinerCardProps> = ({ item, index, activeCategory }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${item.name}, ${item.address}`
  )}`;

  // cek apakah kategori aktif / item adalah kupon
  const isVoucherMode =
    activeCategory.toLowerCase().includes("kupon") ||
    activeCategory.toLowerCase().includes("voucher");

  const isItemVoucher =
    item.category.toLowerCase().includes("kupon") ||
    item.category.toLowerCase().includes("voucher");

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      // mobile = full, tablet = lebih lebar (w-[260px]), desktop = fix 300px
      className="bg-white rounded-2xl shadow-lg overflow-hidden group flex flex-col h-full w-full"
    >
      {/* Gambar */}
      <div className="relative">
        <Image
          src={item.image_url}
          alt={item.name}
          width={400}
          height={300}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Sembunyikan rating kalau item kupon */}
        {!isItemVoucher && (
          <div className="absolute top-3 right-3 bg-black/50 text-white text-sm font-bold rounded-full 
                          px-3 py-1.5 flex items-center gap-1.5 backdrop-blur-sm shadow-md">
            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
            <span>{Number(item.rating).toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Konten */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
          {item.category}
        </span>
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {item.name}
        </h3>

        <div className="mt-auto space-y-3 text-sm flex-grow">
          <div className="flex items-start text-gray-500">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">{item.address}</span>
          </div>
        </div>

        {/* Tombol */}
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
          {isVoucherMode && isItemVoucher ? (
            <>
              <Button
                variant="default"
                className="w-full rounded-full"
                onClick={() => alert(`Kupon ${item.name} diklaim!`)}
              >
                Klaim Kupon
              </Button>
              <Button asChild variant="outline" className="w-full rounded-full">
                <Link href={`/kuliner/${item.id}`}>Pesan Langsung</Link>
              </Button>
            </>
          ) : (
            <Button asChild variant="outline" className="w-full">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                Lihat di Google Maps
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default KulinerCard;
