"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import SketchBackground from "@/components/public/common/SketchBackground";

const CartEmpty: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <SketchBackground />
      <div className="container mx-auto py-12 md:py-20 relative z-10">
        <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-primary">
          Keranjang Saya
        </h1>
        <div className="text-center py-20 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">
          <ShoppingCart size={80} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Keranjang Pesanan Anda Kosong
          </h2>
          <p className="text-gray-600 mb-6">
            Anda belum menambahkan pesanan apapun.
          </p>
          <Link
            href="/kuliner"
            className="inline-block bg-primary text-white py-1 px-6 rounded-lg text-md transition-colors"
          >
            Mulai Belanja
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartEmpty;
