"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const CollaborationCTA = () => {
  const openWhatsApp = () => {
    window.open('https://wa.me/6281385840306', '_blank');
  };

  return (
    <section className="w-full px-4 md:px-6 lg:px-8 mt-20 pb-15 sm:pb-30">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-primary to-blue-700 text-white rounded-2xl 
                   p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row items-center 
                   justify-between gap-8 w-full max-w-7xl mx-auto"
      >
        <div className="lg:w-2/3 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Mulai Kolaborasi Sekarang
          </h2>
          <p className="text-blue-100 text-lg">
            Hubungi kami melalui WhatsApp untuk diskusi lebih lanjut dan dapatkan penawaran terbaik untuk kampanye Anda.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-gray-200 rounded-full px-8 py-4 text-base flex items-center"
            onClick={openWhatsApp}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Hubungi via WhatsApp
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default CollaborationCTA;
