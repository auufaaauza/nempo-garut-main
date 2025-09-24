"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { type Coupon, claimCoupon } from "@/lib/data";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Clock, MapPin, Gift, Percent, DollarSign, CheckCircle, Star } from "lucide-react";

interface KuponCardProps {
  coupon: Coupon;
  isClaimed: boolean;
  onClaimSuccess?: () => void;
}

const KuponCard: React.FC<KuponCardProps> = ({ coupon, isClaimed, onClaimSuccess }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClaim = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await claimCoupon(coupon.id);
      alert(res.message || "Kupon berhasil diklaim!");
      
      if (onClaimSuccess) {
        onClaimSuccess();
      }
    } catch (err: any) {
      alert(err.message || "Gagal klaim kupon");
    } finally {
      setLoading(false);
    }
  };

  const value = Number(coupon.discount_value);
  const discountText =
    coupon.discount_type === "percent"
      ? `${value % 1 === 0 ? value.toFixed(0) : value}%`
      : `Rp ${value.toLocaleString("id-ID")}`;

  const culinary = coupon.culinaries?.[0];
  const locationText = culinary?.name || coupon.description || "Promo Spesial";
  const categoryText = culinary?.category || "Kupon";
  
  const imagePath = culinary?.image || coupon.image;
  const cardImage = imagePath
    ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${imagePath}`
    : "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400";

  const expiryDate = coupon.expired_at
    ? new Date(coupon.expired_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
      })
    : null;
        
  let claimText = "Klaim";
  let buttonIcon = <Gift size={12} />;
  let buttonClass = "bg-gradient-to-r from-[#3273BE] to-blue-600 hover:from-blue-600 hover:to-[#3273BE]";

  if (isClaimed) {
    claimText = "Terklaim";
    buttonIcon = <CheckCircle size={12} />;
    buttonClass = "bg-gradient-to-r from-green-500 to-green-600 cursor-not-allowed";
  } else if (loading) {
    claimText = "Proses...";
    buttonIcon = <Gift size={12} className="animate-spin" />;
  } else if (!user) {
    claimText = "Login";
  }

  return (
    <motion.div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden h-40 sm:h-[188px] md:h-[196px]"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex h-full relative">
        {/* Left Side - Image */}
        <div className="relative w-2/5 flex-shrink-0">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={cardImage}
              alt={coupon.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          </div>
          
          {/* Hot Badge */}
          <div className="absolute top-2 left-2 z-10">
            <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
              HOT
            </div>
          </div>
          
          {/* Category Badge */}
          <div className="absolute bottom-2 left-2 z-10">
            <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-full">
              {categoryText}
            </span>
          </div>
        </div>
        
        {/* Dotted Separator */}
        <div className="relative w-4 flex-shrink-0 bg-gray-50">
          <svg
            className="absolute top-0 -left-px h-full w-full text-white"
            viewBox="0 0 10 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0 C5 5, 5 95, 0 100"
              stroke="currentColor"
              fill="none"
              strokeWidth="0.5"
              className="text-gray-200"
            />
          </svg>
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 bg-gray-50 p-2 sm:p-3 md:p-4 flex flex-col justify-between">
          {/* Header Section */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-1 sm:mb-2">
              {/* Discount Badge */}
              <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 sm:px-3 py-1 rounded-lg shadow-md relative overflow-hidden">
                {/* Sparkle Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="relative z-10 flex items-center gap-1">
                  {coupon.discount_type === "percent" ? <Percent size={10} /> : <DollarSign size={10} />}
                  <span className="text-sm sm:text-base md:text-lg font-black">{discountText}</span>
                </div>
              </div>
              
              {/* Expiry Date */}
              {expiryDate && (
                <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 pt-1">
                  <Clock size={10} />
                  <span className="hidden sm:inline">s/d </span>
                  <span>{expiryDate}</span>
                </div>
              )}
            </div>
            
            {/* Title and Location */}
            <div className="mb-1 sm:mb-1">
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base leading-tight mb-1 line-clamp-2">
                {coupon.name}
              </h3>
              <div className="flex items-start gap-1 text-[10px] sm:text-xs text-gray-600">
                <MapPin size={10} className="mt-0.5 flex-shrink-0" />
                <span className="break-words line-clamp-2">{locationText}</span>
              </div>
            </div>
          </div>
          
          {/* Footer Section */}
          <div className="flex items-center justify-between gap-2 mt-1">
            {/* Limited Badge */}
            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
              <Star size={10} className="text-yellow-400 fill-current" />
              <span className="hidden sm:inline">Terbatas</span>
              <span className="sm:hidden">Hot</span>
            </div>
            
            {/* Claim Button */}
            <motion.button
              onClick={handleClaim}
              disabled={loading || isClaimed}
              className={`relative overflow-hidden ${buttonClass} disabled:opacity-70 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-semibold shadow-md transition-all duration-300 flex-shrink-0`}
              whileHover={!isClaimed ? { scale: 1.05 } : {}}
              whileTap={!isClaimed ? { scale: 0.95 } : {}}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center gap-1">
                {buttonIcon}
                <span className="hidden xs:inline sm:inline">{claimText}</span>
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @media (max-width: 380px) {
          .xs\\:inline {
            display: inline;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default KuponCard;