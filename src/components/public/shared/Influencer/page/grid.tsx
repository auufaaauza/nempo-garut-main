"use client";

import React from "react";
import { motion } from "framer-motion";
import InfluencerCard from "./card";
import { useInfluencers } from "@/hooks/useInfluencers";
import { Skeleton } from "@mui/material";

// 🎨 Variants untuk Grid
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const InfluencerGrid: React.FC = () => {
  const { data, isLoading, error } = useInfluencers("", 12);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width="100%"
            height={300}
            sx={{ borderRadius: 4 }}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {data.map((influencer) => (
        <InfluencerCard
          key={influencer.id}
          influencer={{
            name: influencer.name,
            imageUrl: influencer.photo,
            // ✅ Convert ke string biar aman
            instagramFollowers: influencer.instagram.followers.toString(),
            tiktokFollowers: influencer.tiktok.followers.toString(),
          }}
        />
      ))}
    </motion.div>
  );
};

export default InfluencerGrid;
