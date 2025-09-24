"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ArrowRight } from 'lucide-react'; // Mengganti ikon Send dengan ArrowRight

// Komponen baru yang lebih fokus pada Call-to-Action
const ExploreCreativeHub = () => {
  return (
    // Menggunakan ID 'join' agar link navigasi tetap berfungsi
    <section id="join" className="section-padding flex items-center justify-center py-24 md:py-32 bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Judul Utama yang Mengajak */}
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
              mb: 2, // Margin bottom
            }}
          >
            Jelajahi Dunia Kreatif Kami
          </Typography>

          {/* Sub-judul yang memberikan konteks */}
          <Typography
            variant="h6"
            component="p"
            sx={{
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto', // Center the paragraph
              mb: 5, // Margin bottom
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Lihat portofolio, layanan, dan cerita inspiratif di balik setiap karya yang kami ciptakan di hub utama kami.
          </Typography>

          {/* Tombol Interaktif */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              component="a" // Membuat tombol berfungsi sebagai tag <a>
              href="https://nempocreative.com"
              target="_blank" // Membuka di tab baru
              rel="noopener noreferrer" // Praktik keamanan terbaik
              variant="contained"
              size="large"
              endIcon={<ArrowRight />}
              sx={{
                borderRadius: '9999px', // Membuat tombol berbentuk pil
                px: { xs: 4, md: 6 },
                py: 2,
                fontWeight: 'bold',
                fontSize: { xs: '0.9rem', md: '1rem' },
                textTransform: 'none',
                background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)', // Gradient biru yang menarik
                boxShadow: '0 4px 20px 0 rgba(0, 118, 255, 0.35)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)', // Efek mengangkat saat di-hover
                  boxShadow: '0 8px 30px 0 rgba(0, 118, 255, 0.45)',
                },
              }}
            >
              Kunjungi Nempo Creative
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreCreativeHub;