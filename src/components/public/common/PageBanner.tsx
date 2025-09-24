// Menandakan ini adalah Client Component untuk animasi
"use client";

import React, { type ElementType } from 'react';
import { motion } from 'framer-motion';

// 1. Definisikan tipe untuk props menggunakan interface
interface PageBannerProps {
  icon?: ElementType; // Tipe untuk komponen, dibuat opsional
  title: string;
  subtitle: string;
  decor1?: ElementType; // Opsional
  decor2?: ElementType; // Opsional
}

const PageBanner: React.FC<PageBannerProps> = ({ 
  icon: Icon, // Ubah nama prop jadi PascalCase untuk digunakan sebagai komponen
  title, 
  subtitle, 
  decor1: Decor1, 
  decor2: Decor2 
}) => {
  return (
    <section className="relative bg-primary/5 pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center"
        >
          {Icon && (
            <div className="inline-block p-4 mb-4 bg-primary text-white rounded-full shadow-lg">
              <Icon className="h-8 w-8" />
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
            {subtitle}
          </p>
        </motion.div>
      </div>
      {/* Dekorasi di latar belakang */}
      {Decor1 && <Decor1 className="absolute -bottom-12 -left-16 w-48 h-48 text-blue-500/10 -rotate-12 opacity-50" />}
      {Decor2 && <Decor2 className="absolute -top-12 -right-16 w-56 h-56 text-blue-500/10 rotate-12 opacity-50" />}
    </section>
  );
};

export default PageBanner;