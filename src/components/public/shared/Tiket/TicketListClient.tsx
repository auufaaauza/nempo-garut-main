'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Search, Mountain, Waves, Loader2 } from 'lucide-react';

import { useDestinations } from '@/hooks/useDestinations';

import PageBanner from '../../common/PageBanner';
import TicketCard from './TicketCard';
import { TextField, Button, Box, Typography, InputAdornment, Skeleton } from '@mui/material';

// --- 1. Impor Button dari UI dengan nama alias ---
import { Button as ShadcnButton } from '@/components/ui/button';

export default function TicketListClient() {
  const { data: destinations, isLoading, error } = useDestinations();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = useMemo(() => {
    if (!destinations) return ['Semua'];
    const uniqCategories = [...new Set(destinations.map(d => d.category).filter(Boolean))];
    return ['Semua', ...uniqCategories];
  }, [destinations]);

  const filtered = useMemo(() => {
    return (destinations || []).filter(d =>
      (selectedCategory === 'Semua' || d.category === selectedCategory) &&
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [destinations, selectedCategory, searchTerm]);

  return (
    <motion.div key="list" className="bg-gray-50 min-h-screen">
      {/* <PageBanner
        icon={Ticket}
        title="Pesan Tiket Wisata"
        subtitle="Rencanakan liburan anda di Garut dengan mudah."
        decor1={Mountain}
        decor2={Waves}
      /> */}

      <section className="py-6 bg-white shadow-sm sticky top-[76px] z-30">
        <div className="container mx-auto space-y-4">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Cari destinasi wisata..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="h-5 w-5 text-gray-400" />
                </InputAdornment>
              ),
              sx: { borderRadius: '9999px' }
            }}
          />
          {/* --- 2. GANTI KOMPONEN BUTTON DI SINI --- */}
          <div className="flex flex-wrap gap-2 justify-center pt-6">
            {categories.map((c) => (
              <ShadcnButton
                key={c}
                variant={selectedCategory === c ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(c)}
                className="rounded-full normal-case"
              >
                {c}
              </ShadcnButton>
            ))}
          </div>
        </div>
      </section>

      <main className="py-15">
        <div className="container mb-20 mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <Box key={index}>
                  <Skeleton variant="rectangular" height={192} sx={{ borderRadius: '1rem 1rem 0 0' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem', mt: 2 }} />
                  <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                  <Skeleton variant="text" width="60%" />
                </Box>
              ))}
            </div>
          ) : error ? (
            <Typography align="center" color="error">
              {error}
            </Typography>
          ) : filtered.length === 0 ? (
            <Typography align="center" color="text.secondary">
              Tidak ada destinasi ditemukan.
            </Typography>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((d) => (
                <TicketCard key={d.id} destination={d} />
              ))}
            </div>
          )}
        </div>
      </main>
    </motion.div>
  );
}