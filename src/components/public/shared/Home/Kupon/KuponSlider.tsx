"use client";

import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import KuponCard from "./KuponCard";
import { useCoupons, useMyCoupons } from "@/hooks/useCoupons";
import { type Coupon } from "@/lib/data";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const KuponCardSkeleton = () => (
    <div className="relative bg-white rounded-2xl shadow-lg flex w-full max-w-xl mx-auto h-40 sm:h-[188px] md:h-[196px] animate-pulse">
        <div className="w-2/5 bg-gray-200 rounded-l-2xl"></div>
        <div className="w-3/5 p-5 flex flex-col justify-between">
            <div className="h-4 w-1/4 bg-gray-200 rounded-full"></div>
            <div className="h-5 w-3/4 bg-gray-200 rounded mt-2"></div>
            <div className="flex items-center mt-3">
                <div className="flex-1 bg-gray-100 h-10 rounded-l-lg"></div>
                <div className="bg-gray-300 h-10 w-24 rounded-r-lg"></div>
            </div>
        </div>
    </div>
);

const SLIDER_FILTERS = { is_active: true, per_page: 8 };

const KuponSlider: React.FC = () => {
  const { data: couponData, isLoading: isLoadingAll, error } = useCoupons(SLIDER_FILTERS);
  const { coupons: myCoupons, isLoading: isLoadingMy, refetch: refetchMyCoupons } = useMyCoupons();
  
  const coupons: Coupon[] = couponData?.data || [];

  const myCouponIds = useMemo(() => new Set(myCoupons.map(coupon => coupon.id)), [myCoupons]);

  const isLoading = isLoadingAll || isLoadingMy;

  return (
    <section className="mt-18 py-12 px-4 sm:px-6 lg:px-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Diskon Spesial Untukmu!
        </h2>
        
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <KuponCardSkeleton />
            <div className="hidden md:block">
              <KuponCardSkeleton />
            </div>
             <div className="hidden lg:block">
              <KuponCardSkeleton />
            </div>
          </div>
        )}

        {error && (
          <p className="text-center text-red-500">{error || "Gagal memuat promo. Coba lagi nanti."}</p>
        )}

        {!isLoading && !error && coupons.length === 0 && (
          <p className="text-center text-gray-500">Saat ini belum ada promo spesial.</p>
        )}

        {!isLoading && !error && coupons.length > 0 && (
          <div className="relative group">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              slidesPerView={1}
              spaceBetween={16}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={coupons.length > 3}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              className="pb-12"
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 24 },
                1280: { slidesPerView: 3, spaceBetween: 32 },
              }}
            >
              {coupons.map((coupon) => {
                const isClaimed = myCouponIds.has(coupon.id);

                return (
                  <SwiperSlide key={coupon.id} className="self-stretch h-auto px-2 py-5">
                    <KuponCard 
                      coupon={coupon} 
                      isClaimed={isClaimed}
                      onClaimSuccess={refetchMyCoupons}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <button aria-label="Previous slide" className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 -left-4 z-10 p-2 bg-white/80 rounded-full shadow-lg cursor-pointer transition-all opacity-0 group-hover:opacity-100 hover:bg-white disabled:opacity-30" disabled={coupons.length <= 3}>
              <ChevronLeft className="text-gray-800" />
            </button>
            <button aria-label="Next slide" className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 -right-4 z-10 p-2 bg-white/80 rounded-full shadow-lg cursor-pointer transition-all opacity-0 group-hover:opacity-100 hover:bg-white disabled:opacity-30" disabled={coupons.length <= 3}>
              <ChevronRight className="text-gray-800" />
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background-color: #3273BE !important;
        }
        .swiper-slide {
            height: auto;
        }
      `}</style>
    </section>
  );
};

export default KuponSlider;