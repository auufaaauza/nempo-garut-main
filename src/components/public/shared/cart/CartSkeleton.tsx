"use client";

import React from "react";
import SketchBackground from "@/components/public/common/SketchBackground";

const CartSkeleton: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <SketchBackground />
      <div className="container mx-auto py-12 md:py-20 relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-primary">Keranjang Belanja</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-[200px] bg-gray-200/50 rounded-lg animate-pulse"></div>
            <div className="h-[200px] bg-gray-200/50 rounded-lg animate-pulse"></div>
          </div>
          <div className="lg:col-span-1">
            <div className="h-[300px] bg-gray-200/50 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
