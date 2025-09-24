// File: src/components/public/shared/TopRatedWisataSection.tsx

"use client";

import React, { useMemo } from "react";
import type { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLangStore } from "@/stores/language";

// ✅ pakai hook tours
import { useTours } from "@/hooks/useTours";
import type { Tour } from "@/lib/data";

const TopRatedWisataSection: FC = () => {
  const { selectedLanguage } = useLangStore();
  const { data: tours, isLoading, error } = useTours();

  const texts = {
    titleFirst: {
      ID: "Wisata",
      EN: "Tourism",
      SU: "Wisata",
    },
    titleRest: {
      ID: "Rating Tertinggi",
      EN: "Top Rated",
      SU: "Rating Pangluhung",
    },
    subtitle: {
      ID: "Pilihan terbaik berdasarkan ulasan pengunjung",
      EN: "Best choices based on visitor reviews",
      SU: "Pilihan pangalusna tina ulasan nu datang",
    },
    seeAll: {
      ID: "Lihat Semua",
      EN: "See All",
      SU: "Tingali Sadayana",
    },
    seeOnMaps: {
      ID: "Lihat di Google Maps",
      EN: "View on Google Maps",
      SU: "Tingali dina Google Maps",
    },
  };

  // ✅ ambil 8 tour dengan rating tertinggi
  const topRatedWisata = useMemo((): Tour[] => {
    if (!tours) return [];
    return [...tours]
      .sort((a, b) => b.rating_avg - a.rating_avg)
      .slice(0, 8);
  }, [tours]);

  // --- Komponen Skeleton untuk satu kartu ---
  const TourCardSkeleton: FC = () => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col w-72 flex-shrink-0 animate-pulse">
      <div className="relative h-72 bg-gray-200"></div> {/* Gambar Skeleton */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-4 w-1/3 bg-gray-200 rounded mb-2"></div> {/* Kategori Skeleton */}
        <div className="h-5 w-2/3 bg-gray-200 rounded mb-3"></div> {/* Judul Skeleton */}
        <div className="flex items-start text-sm text-gray-500 mt-auto">
          <div className="h-4 w-4 bg-gray-200 rounded-full mr-2"></div> {/* Ikon Skeleton */}
          <div className="h-4 w-full bg-gray-200 rounded"></div> {/* Alamat Skeleton */}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="h-10 w-full bg-gray-200 rounded-lg"></div> {/* Tombol Skeleton */}
        </div>
      </div>
    </div>
  );
  // --- Akhir Komponen Skeleton ---

  return (
    <section className="section-padding flex justify-center bg-gray-50/80 backdrop-blur-sm hero-pattern">
      <div className="container py-15">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-6"
        >
          <div>
            <h2 className="section-h2 text-xl font-bold text-gray-900">
              {texts.titleFirst[selectedLanguage]}{" "}
              <span className="text-primary">
                {texts.titleRest[selectedLanguage]}
              </span>
            </h2>
            <p className="text-gray-600 mt-1">
              {texts.subtitle[selectedLanguage]}
            </p>
          </div>
          <Link href="/wisata">
            <Button
              variant="ghost"
              className="text-primary font-semibold hidden sm:flex"
            >
              {texts.seeAll[selectedLanguage]}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* ✅ loading & error handler */}
        {isLoading && (
          <div className="flex overflow-x-auto overflow-y-hidden space-x-4 pb-4 scrollbar-hide -mx-4 px-4">
            {/* Tampilkan 4 skeleton saat loading */}
            {[...Array(4)].map((_, i) => (
              <TourCardSkeleton key={i} />
            ))}
          </div>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!isLoading && !error && (
          <div className="flex overflow-x-auto overflow-y-hidden space-x-4 pb-4 scrollbar-hide -mx-4 px-4">
            {topRatedWisata.map((item) => {
              const googleMapsUrl = item.address_url
                ? item.address_url
                : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${item.title}, ${item.address}`
                  )}`;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden group flex flex-col w-72 flex-shrink-0"
                >
                  <div className="relative h-72">
                    {/* --- PERUBAHAN DI SINI (Pastikan item.cover_url adalah URL lengkap) --- */}
                    {item.cover_url ? (
                      <Image
                        src={item.cover_url}
                        alt={item.title}
                        fill // Mengisi div parent secara otomatis
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Opsional: untuk optimasi
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        priority={topRatedWisata.indexOf(item) < 3} // Prioritaskan 3 gambar pertama
                      />
                    ) : (
                        // Placeholder jika tidak ada gambar
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            No Image
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-3 right-3 bg-black/50 text-white text-xs font-bold rounded-full px-2.5 py-1 flex items-center gap-1 backdrop-blur-sm">
                      <Star
                        className="h-3 w-3 text-yellow-400"
                        fill="currentColor"
                      />
                      <span>{item.rating_avg.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors truncate">
                      {item.title}
                    </h3>
                    <div className="flex items-start text-sm text-gray-500 mt-auto">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                      <span className="line-clamp-2">{item.address}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Button asChild variant="outline" className="w-full">
                        <a
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {texts.seeOnMaps[selectedLanguage]}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopRatedWisataSection;