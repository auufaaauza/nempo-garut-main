"use client";

import { useState, useEffect } from 'react';
import api from '@/services/api';
// Import tipe dari file baru
import { type CulinaryItem } from '@/lib/data';

// Hook ini tidak berubah, hanya import tipenya saja
export function useCulinaries() {
  const [data, setData] = useState<CulinaryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCulinaries = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get('/api/culinaries');
        const parsedData = response.data.map((item: any) => ({
          ...item,
          rating: parseFloat(item.rating),
          reviews: parseInt(item.reviews, 10),
        }));
        setData(parsedData);
      } catch (err: any) {
        setError("Gagal memuat data kuliner. Coba lagi nanti.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCulinaries();
  }, []);

  return { data, isLoading, error };
}