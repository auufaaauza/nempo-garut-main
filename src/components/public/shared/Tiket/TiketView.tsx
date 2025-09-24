"use client";

import React, { useState, useMemo } from 'react';
import type { FC, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Search } from 'lucide-react'; // Menggunakan lucide untuk ikon

// MUI Imports (sudah diperbaiki)
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'; // Nama komponen yang benar adalah TextField
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

// Impor data dan tipe dari WisataData (tetap)
import { allWisataData, type WisataItem } from '@/data/WisataData'; 
import TicketCard from './TiketCard';

// Tipe untuk props (tetap)
interface TiketViewProps {
  onOrderSelect: (destination: WisataItem) => void;
}
// ===================================================

const ticketDestinations = allWisataData.filter(d => d.isTicketAvailable);

const TiketView: FC<TiketViewProps> = ({ onOrderSelect }) => {
  // Semua logika state dan memoization dipertahankan
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = useMemo((): string[] => {
    return ['Semua', ...new Set(ticketDestinations.map(d => d.category))];
  }, []);

  const filteredDestinations = useMemo((): WisataItem[] => {
    return ticketDestinations.filter(d => {
      const matchesCategory = selectedCategory === 'Semua' || d.category === selectedCategory;
      const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <motion.div key="list" className="overflow-x-hidden">
      {/* Bagian Header - Style asli dengan tag HTML standar */}
      <section className="relative bg-primary/10 pt-24 pb-12 text-center">
        <div className="container">
          <div className="inline-block p-4 mb-4 bg-primary text-white rounded-full shadow-lg">
            <Ticket className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
            Pesan Tiket Wisata
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
            Rencanakan liburan Anda di Garut dengan mudah.
          </p>
        </div>
      </section>
      
      {/* Bagian Filter - Menggunakan komponen MUI yang sudah diperbaiki */}
      <section className="py-6 bg-gray-100/80 backdrop-blur-sm sticky top-[60px] lg:top-[76px] z-30 border-b">
        <div className="container space-y-4">
          <Box sx={{ maxWidth: '500px', width: '100%', mx: 'auto' }}>
            <TextField
              type="text"
              placeholder="Cari destinasi wisata..."
              value={searchTerm}
              onChange={handleSearchChange}
              variant="outlined"
              fullWidth
              sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: '9999px' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="h-5 w-5 text-primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                // V V V BAGIAN YANG DIPERBAIKI V V V
                variant={selectedCategory === category ? 'contained' : 'outlined'}
                size="small" // 'sm' di shadcn/ui menjadi 'small' di MUI
                // ^ ^ ^ BAGIAN YANG DIPERBAIKI ^ ^ ^
                onClick={() => setSelectedCategory(category)}
                sx={{ borderRadius: '9999px', textTransform: 'none' }} // Styling dipindahkan ke prop `sx`
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Bagian Daftar Tiket - Style asli */}
      <main className="section-padding">
        <div className="container">
          <AnimatePresence mode="wait">
            {filteredDestinations.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredDestinations.map((destination) => (
                  <TicketCard
                    key={destination.id}
                    destination={destination}
                    onOrder={onOrderSelect}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16 col-span-full">
                <Ticket className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-700">Tiket Tidak Ditemukan</h3>
                <p className="text-gray-500 mt-2">Coba kata kunci atau kategori lain.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </motion.div>
  );
};

export default TiketView;