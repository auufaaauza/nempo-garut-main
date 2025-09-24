"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Clapperboard } from "lucide-react";
import ParallaxCardImage from "@/components/public/common/ParallaxCardImage";

interface Influencer {
  name: string;
  imageUrl: string;
  instagramFollowers: string; // ✅ sekarang string saja
  tiktokFollowers: string;
}

interface InfluencerCardProps {
  influencer: Influencer;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const InfluencerCard: React.FC<InfluencerCardProps> = ({ influencer }) => {
  const formatFollowers = (f: string): string => {
    const num = parseFloat(f);
    if (isNaN(num)) return "0";

    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(".0", "") + "M";
    if (num >= 1000) return (num / 1000).toFixed(1).replace(".0", "") + "K";
    return num.toString();
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300"
    >
      <div className="relative">
        <ParallaxCardImage
          src={influencer.imageUrl}
          alt={influencer.name}
          className="h-72"
          imageClassName="object-center transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-5 text-white">
          <h3 className="text-2xl font-bold">{influencer.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-around items-center text-center">
          {/* Instagram */}
          <div className="flex flex-col items-center space-y-1 text-gray-700">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 text-white shadow-md">
              <Instagram className="h-6 w-6" />
            </div>
            <span className="font-bold text-lg">
              {formatFollowers(influencer.instagramFollowers)}
            </span>
            <span className="text-xs text-gray-500">Instagram</span>
          </div>

          {/* TikTok */}
          <div className="flex flex-col items-center space-y-1 text-gray-700">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-gray-800 to-black text-white shadow-md">
              <Clapperboard className="h-6 w-6" />
            </div>
            <span className="font-bold text-lg">
              {formatFollowers(influencer.tiktokFollowers)}
            </span>
            <span className="text-xs text-gray-500">TikTok</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InfluencerCard;
