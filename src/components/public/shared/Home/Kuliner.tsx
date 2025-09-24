"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, MapPin, ExternalLink, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCulinaries } from "@/hooks/useCulinaries";
import { CulinaryItem } from "@/lib/data";
import Image from "next/image";
import { useLangStore } from "@/stores/language";

const TopRatedKulinerSection = () => {
  const { data: allKulinerData, isLoading, error } = useCulinaries();
  const { selectedLanguage } = useLangStore();

  const texts = {
    titleFirst: {
      ID: "Kuliner",
      EN: "Culinary",
      SU: "Kadaharan",
    },
    titleRest: {
      ID: "Paling Populer",
      EN: "Top Rated",
      SU: "Pangpopuler",
    },
    loading: {
      ID: "Halaman Sedang Dimuat...",
      EN: "Loading...",
      SU: "Halaman keur dimuat...",
    },
    notFound: {
      ID: "Kuliner Tidak Ditemukan",
      EN: "Culinary Not Found",
      SU: "Teu Kapanggih Kadaharan",
    },
    tryAgain: {
      ID: "Coba lagi",
      EN: "Try again",
      SU: "Cobian deui",
    },
    subtitle: {
      ID: "Cicipi kelezatan yang paling dicari di Garut.",
      EN: "Taste the most sought-after delicacies in Garut.",
      SU: "Cobian kadaharan anu pang populerna di Garut.",
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

  // Ambil 8 kuliner terbaik berdasarkan rating
  const topRatedKuliner = useMemo((): CulinaryItem[] => {
    if (!allKulinerData) return [];
    return [...allKulinerData].sort((a, b) => b.rating - a.rating).slice(0, 8);
  }, [allKulinerData]);

  if (isLoading) {
    return (
      <section className="section-padding bg-white/80 backdrop-blur-sm">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="section-h2 font-bold text-gray-900">
                {texts.titleFirst[selectedLanguage]}{" "}
                <span className="text-primary">
                  {texts.titleRest[selectedLanguage]}
                </span>
              </h2>
              <p className="text-gray-600 mt-1">
                {texts.loading[selectedLanguage]}
              </p>
            </div>
          </div>
          <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-72 h-80 bg-gray-200 rounded-2xl animate-pulse flex-shrink-0"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !allKulinerData || !allKulinerData.length) {
    return (
      <section className="section-padding bg-white/80 backdrop-blur-sm">
        <div className="container text-center py-10">
          <Utensils className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg text-gray-700">
            {texts.notFound[selectedLanguage]}
          </h3>
          <p className="text-sm text-gray-500">
            {typeof error === "string" ? error : texts.tryAgain[selectedLanguage]}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding mt-4 flex justify-center bg-white/80 backdrop-blur-sm">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-6"
        >
          <div>
            <h2 className="section-h2 font-bold text-gray-900">
              {texts.titleFirst[selectedLanguage]}{" "}
              <span className="text-primary">
                {texts.titleRest[selectedLanguage]}
              </span>
            </h2>
            <p className="text-gray-600 mt-1">
              {texts.subtitle[selectedLanguage]}
            </p>
          </div>
          <Link href="/kuliner">
            <Button
              variant="ghost"
              className="text-primary font-semibold hidden sm:flex"
            >
              {texts.seeAll[selectedLanguage]}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="flex overflow-x-auto overflow-y-hidden space-x-4 pb-4 scrollbar-hide -mx-4 px-4">
          {topRatedKuliner.map((item) => {
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${item.name}, ${item.address}`
            )}`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group flex flex-col h-full w-72 flex-shrink-0"
              >
                <div className="relative">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 right-3 bg-black/50 text-white text-sm font-bold rounded-full px-3 py-1.5 flex items-center gap-1.5 backdrop-blur-sm shadow-md rating-shine-home">
                    <Star
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                    />
                    <span>{item.rating.toFixed(1)}</span>
                  </div>
                </div>
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
      </div>
    </section>
  );
};

export default TopRatedKulinerSection;
