// === File: hooks/useDestinations.ts ===
"use client";

import { useState, useEffect } from 'react';
import api from '@/services/api';
import { type Destination } from '@/lib/data'; 

// Hook untuk fetch daftar destinasi
export function useDestinations() {
  const [data, setData] = useState<Destination[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get('/api/destinations');
        const parsedData = response.data.map((item: any): Destination => ({
          ...item,
          rating: item.rating ? parseFloat(item.rating) : 0,
          reviews: item.reviews ? parseInt(item.reviews, 10) : 0,
        }));
        setData(parsedData);
      } catch (err: any) {
        setError("Gagal memuat data destinasi. Coba lagi nanti.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return { data, isLoading, error };
}

// === Hook untuk detail destinasi ===
export function useDestinationDetail(id: string | null) {
  const [data, setData] = useState<Destination | null>(null); // ✅ pakai Destination
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDestination = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(`/api/destinations/${id}`);
        const parsedData: Destination = {
          ...response.data,
          rating: response.data.rating ? parseFloat(response.data.rating) : 0,
          reviews: response.data.reviews
            ? parseInt(response.data.reviews, 10)
            : 0,
        };
        setData(parsedData);
      } catch (err: any) {
        setError("Gagal memuat detail destinasi.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  return { data, isLoading, error };
}
