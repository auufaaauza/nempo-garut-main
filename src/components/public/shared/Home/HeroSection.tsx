// Wajib ada di paling atas karena ada interaksi & hooks
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MapPin, Utensils, Ticket, Users, BookOpen, UserCheck, Calendar, Rss } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

// Definisikan tipe untuk setiap service
type Service = {
  name: string;
  icon: React.ElementType;
  path?: string;
  color: string;
};

// Varian animasi
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const HeroSection: React.FC = () => {
  const router = useRouter(); 
  
  const services: Service[] = [
    { name: 'Wisata', icon: MapPin, path: '/wisata', color: 'from-blue-500 to-cyan-400' },
    { name: 'Kuliner', icon: Utensils, path: '/kuliner', color: 'from-orange-500 to-amber-400' },
    { name: 'Tiket Wisata', icon: Ticket, path: '/tiket', color: 'from-purple-500 to-pink-500' },
    { name: 'Tiket Event', icon: Calendar, path: '/event', color: 'from-red-500 to-rose-400' },
    { name: 'Influencer', icon: UserCheck, path: '/influencer-hub', color: 'from-teal-500 to-emerald-400' },
    { name: 'Komunitas', icon: Users, path: '/komunitas', color: 'from-indigo-500 to-violet-400' },
    { name: 'Kamus', icon: BookOpen, path: '/kamus-sunda', color: 'from-lime-500 to-green-400' },
    { name: 'Berita', icon: Rss, color: 'from-sky-500 to-blue-400' },
  ];

  // Fungsi untuk menangani semua klik
  const handleServiceClick = (path?: string) => {
    if (path) {
      router.push(path); // Pindah halaman jika path ada
    } else {
      // Tampilkan toast jika path tidak ada
      toast({
        title: "🚧 Fitur Belum Tersedia",
        description: "Fitur ini sedang dalam pengembangan. Segera hadir! 🚀",
      });
    }
  };

  return (
    <div className="bg-background p-4 pt-2 space-y-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gray-50 p-4 rounded-2xl shadow-sm"
      >
        <motion.div className="grid grid-cols-4 gap-x-2 gap-y-4">
          {services.map((service) => (
            <motion.div
              key={service.name}
              variants={itemVariants} 
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center space-y-2 cursor-pointer group"
              onClick={() => handleServiceClick(service.path)}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${service.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs text-center font-medium text-gray-700">{service.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;