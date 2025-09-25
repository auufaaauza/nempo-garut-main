"use client";
import Link from "next/link";
import React from "react";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { motion } from "framer-motion";
import { SponsorshipItem } from "@/data/dummySponsorships";


// === Card Sponsorship ===
export const SponsorshipCard = ({ sponsor }: { sponsor: SponsorshipItem }) => {
  // Hitung persentase progress dana
  const progress =
    sponsor.price && sponsor.price.total > 0
      ? (sponsor.price.current / sponsor.price.total) * 100
      : 0;

  return (
    <motion.div
      className="
        rounded-2xl bg-white shadow-md 
        overflow-hidden flex flex-col 
        transition-all duration-300 ease-out
      "
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Banner with blur background */}
      {sponsor.banner && (
        <div className="relative w-full h-40 flex justify-center items-center overflow-hidden">
          {/* Blur background */}
          <img
            src={sponsor.banner}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-md scale-110"
          />
          {/* Main image */}
          <img
            src={sponsor.banner}
            alt={`${sponsor.name} banner`}
            className="relative z-10 max-h-full max-w-full object-contain"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-4 flex flex-col flex-1">
        {/* Badge kategori */}
        <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-primary rounded-full w-fit">
          {sponsor.category}
        </span>

        {/* Nama Sponsorship */}
        <h2 className="text-xl font-bold text-primary">{sponsor.name}</h2>

        {/* Deskripsi singkat */}
        {sponsor.description && (
          <p className="text-gray-600 text-sm">{sponsor.description}</p>
        )}

        {/* Dana dibutuhkan */}
        {sponsor.price && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Total dana:{" "}
              <span className="font-semibold text-primary">
                Rp {sponsor.price.current.toLocaleString("id-ID")}
              </span>{" "}
              / Rp {sponsor.price.total.toLocaleString("id-ID")}
            </p>
            {/* Progress bar */}
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#0b73a3",
                },
              }}
            />
          </div>
        )}

        {/* Benefit list */}
        <ul className="text-gray-600 text-left list-disc list-inside space-y-1 text-sm">
          {sponsor.benefits.map((benefit, idx) => (
            <li key={idx}>{benefit}</li>
          ))}
        </ul>

        {/* Button → link ke detail */}
      <div className="mt-auto">
        <Link href={`/sponsorship/${sponsor.id}`} passHref>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#0b73a3",
              textTransform: "none",
              borderRadius: "9999px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#095e84",
                transform: "scale(1.03)",
                boxShadow: "0 6px 16px rgba(11, 115, 163, 0.4)",
              },
            }}
          >
            Lihat detail Event
          </Button>
        </Link>
      </div>
      </div>
    </motion.div>
  );
};
