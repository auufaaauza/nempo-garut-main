"use client";

import { useState, useEffect } from "react";
import { type Tour, getTours, getTourById } from "@/lib/data";

// === Hook: ambil semua tours ===
export function useTours() {
  const [data, setData] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const tours = await getTours();
        setData(tours);
      } catch (err: any) {
        console.error(err);
        setError("Gagal memuat data tours. Coba lagi nanti.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  return { data, isLoading, error };
}

// === Hook: ambil detail tour ===
export function useTourDetail(id: string | null) {
  const [data, setData] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTour = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const tour = await getTourById(id);
        setData(tour);
      } catch (err: any) {
        console.error(err);
        setError("Gagal memuat detail tour.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  return { data, isLoading, error };
}