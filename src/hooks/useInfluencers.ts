"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";
import { type Influencer } from "@/lib/data";

export function useInfluencers(q: string = "", perPage: number = 12) {
  const [data, setData] = useState<Influencer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInfluencers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.get("/api/influencers", {
          params: { q, per_page: perPage },
        });

        // ✅ PERBAIKAN UTAMA: Ambil array dari res.data.data.data
        const rawList = res.data?.data?.data || [];
        const list = Array.isArray(rawList) ? rawList : [];

        console.log("Fetched influencers:", list); // 👈 Debug

        const mapped: Influencer[] = list.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          name: item.name,
          photo: `https://admin.nempogarut.com${item.photo}`,
          instagram: {
            username: item.instagram?.username ?? "",
            followers: Number(item.instagram?.followers ?? 0),
          },
          tiktok: {
            username: item.tiktok?.username ?? "",
            followers: Number(item.tiktok?.followers ?? 0),
          },
        }));

        setData(mapped);
      } catch (err: any) {
        setError("Gagal memuat data influencer.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfluencers();
  }, [q, perPage]);

  return { data, isLoading, error };
}   