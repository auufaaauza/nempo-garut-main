"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import api from "@/services/api";

export type OrderBubbleCounts = {
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
};

const DEFAULT_COUNTS: OrderBubbleCounts = {
  pending: 0,
  confirmed: 0,
  completed: 0,
  cancelled: 0,
};

export function useOrderBubbleCounts() {
  const [counts, setCounts] = useState<OrderBubbleCounts>(DEFAULT_COUNTS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchCounts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get("/api/my-orders/bubble-count");
      const data = response.data?.data ?? DEFAULT_COUNTS;

      if (mountedRef.current) {
        setCounts({
          pending: Number(data.pending) || 0,
          confirmed: Number(data.confirmed) || 0,
          completed: Number(data.completed) || 0,
          cancelled: Number(data.cancelled) || 0,
        });
      }
    } catch (err: any) {
      if (mountedRef.current) {
        setCounts(DEFAULT_COUNTS);
        setError(err?.response?.data?.message || "Gagal memuat ringkasan pesanan.");
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  return {
    counts,
    isLoading,
    error,
    refetch: fetchCounts,
  };
}
