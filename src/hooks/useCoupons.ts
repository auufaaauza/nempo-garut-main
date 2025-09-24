"use client";

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  getCoupons,
  getCouponById,
  getMyCoupons,
  type Coupon,
  type PaginatedResponse,
  type CouponFilters
} from '@/lib/data';

/**
 * Hook untuk mengambil daftar semua kupon (dengan filter dan pagination).
 * @param filters - Objek berisi parameter filter seperti halaman, pencarian, dll.
 */
export function useCoupons(filters: CouponFilters) {
  const [data, setData] = useState<PaginatedResponse<Coupon> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Gunakan JSON.stringify untuk dependensi yang stabil
  const filtersKey = JSON.stringify(filters);

  useEffect(() => {
    const fetchCoupons = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getCoupons(filters);
        // ✅ Pastikan respons memiliki properti 'data' yang berupa array
        if (response && Array.isArray(response.data)) {
          setData(response);
        } else {
          // Jika struktur tidak sesuai, set data kosong untuk mencegah error
          setData({ data: [], current_page: 1, total: 0, per_page: 8, from: 0, to: 0, first_page_url: '', last_page_url: '', next_page_url: null, prev_page_url: null, path: '' });
          console.warn("Struktur data dari getCoupons tidak sesuai harapan.", response);
        }
      } catch (err: any) {
        setError("Gagal memuat data kupon. Coba lagi nanti.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupons();
  }, [filtersKey]); // ✅ Dependensi diubah menjadi string

  return { data, isLoading, error };
}

/**
 * Hook untuk mengambil detail satu kupon berdasarkan ID-nya.
 * @param id - ID dari kupon yang ingin diambil.
 */
export function useCouponById(id: string | null) {
  const [data, setData] = useState<Coupon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchCoupon = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const coupon = await getCouponById(id);
        setData(coupon);
      } catch (err: any) {
        setError("Gagal memuat detail kupon.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupon();
  }, [id]);

  return { data, isLoading, error };
}

/**
 * Hook KHUSUS untuk mengambil daftar kupon MILIK PENGGUNA yang sedang login.
 * Mengelola state loading, error, dan data secara otomatis, serta menyediakan fungsi refetch.
 */
export function useMyCoupons() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => {
    setTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!isAuthenticated) {
      setCoupons([]);
      setIsLoading(false);
      return;
    }

    const fetchMyCoupons = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMyCoupons();
        setCoupons(data);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan saat memuat kupon Anda.");
        console.error("Gagal ambil kupon:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyCoupons();

  }, [isAuthenticated, isAuthLoading, trigger]);

  return { coupons, isLoading, error, refetch };
}