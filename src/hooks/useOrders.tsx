"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import api from "@/services/api";
import type { CulinaryItem } from "@/lib/data"; // Sesuaikan path jika perlu

// Definisikan tipe untuk Order dan OrderItem
export interface OrderItem {
  id: string;
  name?: string;
  quantity?: number;
  price?: number;
  subtotal?: number;
  status?: string;
  details?: Record<string, any> | string | null;
}

export interface Order {
  id: string; // UUID
  booking_date: string;
  status?: string;
  total_price: number;
  customer_name: string;
  culinary?: CulinaryItem | null; // Data tempat kulinernya
  items?: OrderItem[]; // Daftar menu yang dipesan
  created_at: string;
  payment_status?: string;
  payment_type?: string;
  snap_redirect_url?: string | null;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/my-orders");
      if (mountedRef.current) {
        setOrders(response.data ?? []);
      }
    } catch (err: any) {
      if (mountedRef.current) {
        setError("Gagal memuat riwayat pesanan.");
      }
      console.error(err);
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, isLoading, error, refetch: fetchOrders };
}
