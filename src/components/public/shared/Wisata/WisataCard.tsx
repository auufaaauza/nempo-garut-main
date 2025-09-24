"use client";

import React from "react";
import type { FC } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Tour } from "@/lib/data";

interface WisataCardProps {
  destination: Tour;
  index: number;
}

const WisataCard: FC<WisataCardProps> = ({ destination, index }) => {
  const googleMapsUrl = destination.address_url
    ? destination.address_url
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${destination.title}, ${destination.address}`
      )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group flex flex-col h-full w-full"
    >
      {/* Gambar */}
      <div className="relative">
        <Image
          src={destination.cover_url || "/placeholder.jpg"}
          alt={destination.title}
          width={400}
          height={300}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-3 right-3 bg-black/50 text-white text-sm font-bold rounded-full px-3 py-1.5 flex items-center gap-1.5 backdrop-blur-sm shadow-md">
          <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
          <span>
            {destination.rating_avg ? destination.rating_avg.toFixed(1) : "0.0"}
          </span>
        </div>
      </div>

      {/* Konten */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
          {destination.category}
        </span>
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {destination.title}
        </h3>

        <div className="mt-auto space-y-3 text-sm flex-grow">
          <div className="flex items-start text-gray-500">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">{destination.address}</span>
          </div>
        </div>

        {/* Tombol */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Button asChild variant="outline" className="w-full">
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
              Lihat di Google Maps
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default WisataCard;
