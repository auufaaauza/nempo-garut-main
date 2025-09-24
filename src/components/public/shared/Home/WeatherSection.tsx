"use client";

import React from 'react';
import { useWeather } from '@/hooks/useWeather';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, CloudSun, CloudSnow, Wind, Thermometer, CalendarCheck2, CalendarX2, WifiOff } from 'lucide-react';
import Skeleton from "@mui/material/Skeleton";

const WeatherIcon = ({ iconCode, className }: { iconCode: string; className: string }) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    '01d': <Sun className={className} />,
    '01n': <Sun className={className} />,
    '02d': <CloudSun className={className} />,
    '02n': <CloudSun className={className} />,
    '03d': <Cloud className={className} />,
    '03n': <Cloud className={className} />,
    '04d': <Cloud className={className} />,
    '04n': <Cloud className={className} />,
    '09d': <CloudRain className={className} />,
    '09n': <CloudRain className={className} />,
    '10d': <CloudRain className={className} />,
    '10n': <CloudRain className={className} />,
    '11d': <CloudRain className={className} />,
    '11n': <CloudRain className={className} />,
    '13d': <CloudSnow className={className} />,
    '13n': <CloudSnow className={className} />,
    '50d': <Wind className={className} />,
    '50n': <Wind className={className} />,
  };
  return iconMap[iconCode] || <Thermometer className={className} />;
};

const getVisitRecommendation = (iconCode: string): { isGood: boolean; message: string; icon: React.ReactNode } => {
  const goodWeather = ['01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n', '50d', '50n'];
  const badWeather = ['09d', '09n', '10d', '10n', '11d', '11n', '13d', '13n'];

  if (goodWeather.includes(iconCode)) {
    return {
      isGood: true,
      message: "Hari ini waktu yang tepat untuk menjelajahi keindahan Garut!",
      icon: <CalendarCheck2 className="w-8 h-8 text-green-500" />
    };
  }
  if (badWeather.includes(iconCode)) {
    return {
      isGood: false,
      message: "Cuaca kurang mendukung, pertimbangkan untuk mengunjungi destinasi indoor.",
      icon: <CalendarX2 className="w-8 h-8 text-red-500" />
    };
  }
  return {
    isGood: true,
    message: "Nikmati petualangan Anda di Garut hari ini!",
    icon: <CalendarCheck2 className="w-8 h-8 text-green-500" />
  };
};

const WeatherSection: React.FC = () => {
  const { weatherData, loading, error } = useWeather();

  if (loading) {
    return (
      <section className='backdrop-blur-sm px-6 pt-8 md:pt-12 relative z-10'>
        <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <Skeleton variant="circular" width={48} height={48} />
            <div className="flex-1">
              <Skeleton variant="text" width={120} height={24} />
              <Skeleton variant="text" width={80} height={18} />
            </div>
          </div>
          <div className="w-full md:w-px h-px md:h-12 bg-gray-200"></div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <Skeleton variant="circular" width={32} height={32} />
            <div className="flex-1">
              <Skeleton variant="text" width={200} height={20} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-red-50 text-red-700 p-6 rounded-2xl shadow-lg border border-red-200 flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-4">
        <WifiOff className="w-8 h-8 text-red-500 flex-shrink-0" />
        <div>
          <p className="font-bold">Gagal Memuat Data Cuaca</p>
          <p className="text-sm">{error || "Data tidak tersedia."}</p>
        </div>
      </div>
    );
  }

  const recommendation = getVisitRecommendation(weatherData.icon);

  return (
    <section className=' backdrop-blur-sm px-6 pt-8 md:pt-12 relative z-10'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6"
      >
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="text-accent flex-shrink-0">
            <WeatherIcon iconCode={weatherData.icon} className="w-10 h-10 md:w-12 md:h-12 text-yellow-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-bold text-gray-800">
              Cuaca Garut: {Math.round(weatherData.temp)}°C
            </h3>
            <p className="text-sm md:text-base text-gray-600 capitalize">
              {weatherData.description}
            </p>
          </div>
        </div>

        <div className="w-full md:w-px h-px md:h-12 bg-gray-200"></div>

        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="flex-shrink-0">
            {recommendation.icon}
          </div>
          <div className="flex-1">
            <p className={`text-sm md:text-base font-semibold ${recommendation.isGood ? 'text-gray-800' : 'text-red-700'}`}>
              {recommendation.message}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WeatherSection;
