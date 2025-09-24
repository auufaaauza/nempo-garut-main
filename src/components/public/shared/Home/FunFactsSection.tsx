// Wajib ada di paling atas karena menggunakan animasi interaktif
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mountain, Wind, Coffee, ShoppingBag, ArrowRight } from 'lucide-react';
import Button from '@mui/material/Button';
import { useLangStore } from "@/stores/language"; // <-- 1. Impor store bahasa

// Tipe untuk setiap fakta
type Fact = {
  icon: React.ElementType;
  title: Record<string, string>; // <-- 2. Ubah title & description menjadi objek terjemahan
  description: Record<string, string>;
  color: string;
};

// Varian animasi
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring' } } };

const FunFactsSection: React.FC = () => {
  // 3. Panggil hook untuk mendapatkan bahasa yang dipilih
  const { selectedLanguage } = useLangStore(); 

  // 4. Buat objek terjemahan untuk teks statis
  const texts = {
    title: {
      ID: "Tahukah",
      EN: "Did you",
      SU: "Dupi anjeun",
    },
    titleSpan: {
      ID: "Anda?",
      EN: "Know?",
      SU: "Terang?",
    },
    subtitle: {
      ID: "Fakta menarik tentang kota Garut yang mungkin belum Anda ketahui.",
      EN: "Interesting facts about Garut that you may not know yet.",
      SU: "Fakta-fakta anu narik ngeunaan Garut anu mungkin anjeun teu acan terang.",
    },
    button: {
      ID: "Mulai Jelajah !",
      EN: "Start Exploring !",
      SU: "Mimitian Ngajajah !",
    },
  };

  // 5. Ubah data fakta untuk mendukung terjemahan
  const facts: Fact[] = [
    { 
      icon: Mountain, 
      title: { ID: "Swiss van Java", EN: "Swiss van Java", SU: "Swiss van Java" }, 
      description: { ID: "Garut dijuluki 'Swiss dari Jawa' oleh orang Eropa di masa lalu karena pemandangan pegunungannya yang indah.", EN: "Garut was nicknamed 'Swiss from Java' by Europeans in the past due to its beautiful mountain scenery.", SU: "Garut dilandi 'Swiss ti Jawa' ku urang Eropa baheula kusabab pamandangan gunungna anu éndah." }, 
      color: "from-blue-400 to-cyan-400" 
    },
    { 
      icon: ShoppingBag, 
      title: { ID: "Pusat Industri Kulit", EN: "Leather Industry Center", SU: "Puseur Industri Kulit" }, 
      description: { ID: "Kawasan Sukaregang di Garut terkenal sebagai pusat industri kulit berkualitas tinggi, dari jaket hingga sepatu.", EN: "The Sukaregang area in Garut is famous as a center for high-quality leather industry, from jackets to shoes.", SU: "Wewengkon Sukaregang di Garut kasohor salaku puseur industri kulit kualitas luhur, ti jaket nepi ka sapatu." }, 
      color: "from-amber-500 to-yellow-500" 
    },
    { 
      icon: Coffee, 
      title: { ID: "Rumah bagi Dodol", EN: "Home of Dodol", SU: "Imahna Dodol" }, 
      description: { ID: "Dodol Garut adalah oleh-oleh ikonik yang manis dan legit, menjadi simbol kuliner khas kota ini.", EN: "Dodol Garut is an iconic sweet and sticky souvenir, becoming a symbol of the city's signature culinary.", SU: "Dodol Garut nyaéta oleh-oleh ikonik anu amis sareng legit, jadi simbol kuliner has kota ieu." }, 
      color: "from-orange-500 to-red-500" 
    },
    { 
      icon: Wind, 
      title: { ID: "Kawah Geothermal", EN: "Geothermal Crater", SU: "Kawah Geotermal" }, 
      description: { ID: "Memiliki beberapa kawah geothermal aktif seperti Kawah Kamojang, sumber energi bersih yang menakjubkan.", EN: "It has several active geothermal craters like Kawah Kamojang, an amazing source of clean energy.", SU: "Ngabogaan sababaraha kawah geotermal aktif sapertos Kawah Kamojang, sumber énergi bersih anu matak pik kagumeun." }, 
      color: "from-teal-400 to-green-400" 
    },
  ];

  return (
    <div className="container mx-auto py-10 px-3 max-w-7xl md:py-20">
      <motion.div 
        className="bg-white rounded-3xl shadow-lg p-6 md:p-8 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          <div className="lg:w-1/3 mb-6 lg:mb-0 text-center lg:text-left">
            <motion.h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                {/* 6. Terapkan terjemahan pada teks */}
                {texts.title[selectedLanguage]}{" "}
                <span className="bg-clip-text bg-gradient-to-r text-primary">
                    {texts.titleSpan[selectedLanguage]}
                </span>
            </motion.h2>
            <motion.p className="mt-2 text-gray-600" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                {texts.subtitle[selectedLanguage]}
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-6 "
            >
                <Button component={Link} href="/wisata" variant="contained" size="large" endIcon={<ArrowRight style={{ fontSize: '16px' }} />}
                    sx={{
                        borderRadius: '9999px',
                        textTransform: 'none',
                        fontSize: '1rem',
                        padding: '10px 24px',
                        '& .MuiButton-endIcon': { transition: 'transform 0.2s ease-in-out', },
                        '&:hover .MuiButton-endIcon': { transform: 'translateX(4px)', },
                    }}
                >
                    {texts.button[selectedLanguage]}
                </Button>
            </motion.div>
          </div>

          <motion.div 
            className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {facts.map((fact, index) => (
                <motion.div key={index} variants={itemVariants} className="bg-gray-50 p-5 rounded-2xl flex gap-4 items-start hover:bg-gray-100 transition-colors duration-300">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${fact.color} text-white flex items-center justify-center shadow-md`}>
                        <fact.icon className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-base">{fact.title[selectedLanguage]}</h3>
                        <p className="text-gray-600 text-sm mt-1">{fact.description[selectedLanguage]}</p>
                    </div>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FunFactsSection;