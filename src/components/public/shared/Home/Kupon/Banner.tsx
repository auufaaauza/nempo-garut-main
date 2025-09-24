"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const banners = [
  "/Assets/KuponBanner/1.PNG",
  "/Assets/KuponBanner/2.PNG",
  "/Assets/KuponBanner/3.PNG",
  "/Assets/KuponBanner/4.PNG",
  "/Assets/KuponBanner/5.PNG",
  "/Assets/KuponBanner/6.PNG",
];

const Banner = () => {
  return (
    <div className="w-full bg-transparent relative">
      <div className="w-full max-w-[1580px] mx-auto px-4 pt-6 md:pt-8">
        {/* Navigation Buttons */}
        {/* <div className="swiper-button-prev-custom absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 group">
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-primary transition-colors" />
        </div>
        <div className="swiper-button-next-custom absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 group">
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-primary transition-colors" />
        </div> */}

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          allowTouchMove={true}
          pagination={false}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          speed={800}
          className="w-full banner-swiper"
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 12, centeredSlides: false },
            480: { slidesPerView: 1.2, spaceBetween: 14, centeredSlides: true },
            640: { slidesPerView: 2, spaceBetween: 16, centeredSlides: false },
            768: { slidesPerView: 2, spaceBetween: 18, centeredSlides: false },
            1024: { slidesPerView: 3, spaceBetween: 20, centeredSlides: true },
            1280: { slidesPerView: 3, spaceBetween: 24, centeredSlides: true },
          }}
        >
          {banners.map((img, i) => (
            <SwiperSlide key={i}>
              <BannerSlide img={img} index={i} total={banners.length} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .banner-swiper {
            padding-top: 20px !important;
            padding-bottom: 50px !important;
          }
          .banner-swiper .swiper-slide {
            transition: transform 0.4s ease, opacity 0.4s ease;
            opacity: 0.5;
            transform: scale(0.88);
          }
          .banner-swiper .swiper-slide-active {
            opacity: 1;
            transform: scale(1.05);
            z-index: 10;
          }
          @media (max-width: 1023px) {
            .banner-swiper .swiper-slide {
              transform: scale(1);
              opacity: 1;
            }
            .banner-swiper {
              padding-top: 0 !important;
            }
          }
          .banner-swiper .swiper-pagination {
            position: absolute !important;
            bottom: 10px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: auto !important;
          }
          .banner-swiper .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.5) !important;
            width: 8px !important;
            height: 8px !important;
            opacity: 1 !important;
            margin: 0 4px !important;
            transition: all 0.3s ease !important;
          }
          .banner-swiper .swiper-pagination-bullet-active {
            background: white !important;
            width: 24px !important;
            border-radius: 12px !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
          }
          .swiper-button-prev-custom:hover,
          .swiper-button-next-custom:hover {
            transform: translateY(-50%) scale(1.1);
          }
        `,
        }}
      />
    </div>
  );
};

export default Banner;

// 🔹 Komponen slide dengan skeleton
const BannerSlide = ({ img, index, total }: { img: string; index: number; total: number }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full group cursor-pointer">
      <div className="relative w-full overflow-hidden rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative w-full aspect-[16/9] bg-gray-100">
          {loading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl md:rounded-2xl" />
          )}
          <Image
            src={img}
            alt={`Banner ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-500 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
            priority={index < 3}
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 70vw, 45vw"
            onLoadingComplete={() => setLoading(false)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        {/* <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <span className="text-xs font-semibold text-gray-700">
            {index + 1} / {total}
          </span>
        </div> */}
      </div>
    </div>
  );
};
