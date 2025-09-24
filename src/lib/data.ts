import api from '@/services/api';

// ==========================================================
// TIPE DATA (SEMUA DI SATU TEMPAT)
// ==========================================================

export interface Facility {
  id: string; // UUID
  culinary_id: string;
  name: string;
}

export interface Menu {
  id: string; // UUID
  culinary_id: string;
  category: string;
  name: string;
  price: number;
}

export interface CulinaryItem {
  id: string;
  name: string;
  category: string;
  description?: string;
  rating: number;
  reviews: number;
  address: string;
  image: string;
  facilities: Facility[];
  menus: Menu[];


  coupons?: Coupon[];
}

export interface Destination {
  id: string; // UUID
  name: string;
  category: string;
  address: string;
  description: string;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  prices: {
    weekday: { adult: number; child?: number };
    weekend: { adult: number; child?: number };
  };
  facilities: { icon?: string; text: string }[];
  outbound?: { name: string; price: number }[];
  coords: [number, number];
}

export interface TourFacility {
  id: string;        // UUID
  tour_id: string;   // relasi ke tour
  name: string;
  icon?: string;     // opsional: biar bisa ada ikon di UI
}

export interface Tour {
  id: string; // UUID
  title: string;
  slug: string;
  category: string;
  short_description?: string;
  description?: string;
  location?: string;
  address?: string;
  address_url?: string;  // link ke maps
  price_min: number;
  rating_avg: number;
  total_reviews: number;
  is_active: boolean;
  cover_url?: string;    // gambar utama
  meta?: Record<string, any>; // JSON -> object
  published_at?: string;

  facilities: TourFacility[];
  // jika nanti perlu: tickets, ticketCategories
}

export interface Influencer {
  id: string;       // UUID
  slug: string;
  name: string;
  photo: string;
  instagram: {
    username: string;
    followers: number;
  };
  tiktok: {
    username: string;
    followers: number;
  };
  meta?: Record<string, any>;
}

// --- TIPE DATA UNTUK KUPON ---

export type DiscountType = 'percent' | 'fixed';

export interface Coupon {
  id: string;
  name: string;
  code: string;
  description?: string;
  discount_type: DiscountType;
  discount_value: number;
  quota?: number;
  expired_at?: string | null;
  min_purchase?: number;
  max_discount?: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  culinaries?: any[]; // Ganti `any` dengan tipe yang sesuai jika ada
  destinations?: any[]; // Ganti `any` dengan tipe yang sesuai jika ada
}

// Tipe data untuk pagination dari Laravel
export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
  per_page: number;
  total: number;
  from: number;
  to: number;
}


// ==========================================================
// FUNGSI FETCHING DATA (SEMUA DI SATU TEMPAT)
// ==========================================================

/**
 * Mengambil SEMUA data kuliner.
 */
export async function getCulinaries(): Promise<CulinaryItem[]> {
    try {
        const response = await api.get(`/api/culinaries`);
        // Lakukan parsing tipe data jika diperlukan
        return (response.data || []).map((item: any) => ({
            ...item,
            rating: parseFloat(item.rating),
            reviews: parseInt(item.reviews, 10),
        }));
    } catch (error) {
        console.error(`Gagal mengambil semua data kuliner:`, error);
        return [];
    }
}

/**
 * Mengambil SATU data kuliner berdasarkan ID.
 */
export async function getCulinaryById(id: string): Promise<CulinaryItem | null> {
    try {
        const response = await api.get(`/api/culinaries/${id}`);
        const item = response.data;
        return {
          ...item,
          rating: parseFloat(item.rating),
          reviews: parseInt(item.reviews, 10),
        };
    } catch (error) {
        console.error(`Gagal mengambil data kuliner dengan ID ${id}:`, error);
        return null;
    }
}

/**
 * Mengambil SEMUA data destinasi wisata dari API.
 */
export async function getDestinations(): Promise<Destination[]> {
  try {
    const response = await api.get("/api/destinations");
    
    // INI PENJAGANYA: Pastiin yang dateng beneran array
    if (Array.isArray(response.data)) {
      return response.data;
    }
    
    // Kalo bukan array, balikin array kosong biar gak crash
    console.error("API /api/destinations tidak mengembalikan array:", response.data);
    return [];

  } catch (error) {
    console.error("Gagal mengambil data destinasi:", error);
    return []; // Kembalikan array kosong jika gagal total
  }
}

/**
 * Mengambil SATU data destinasi wisata berdasarkan ID.
 */
export async function getDestinationById(id: string): Promise<Destination | null> {
  try {
    const response = await api.get(`/api/destinations/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Gagal mengambil data destinasi dengan ID ${id}:`, error);
    return null;
  }
}

export async function getDestinationIds(): Promise<string[]> {
  try {
    // Panggil endpoint baru yang simpel
    const response = await api.get("/api/destinations/for-static-build");
    return response.data || [];
  } catch (error) {
    console.error("Gagal mengambil ID destinasi:", error);
    return [];
  }
}

export async function getTours(): Promise<Tour[]> {
  try {
    const response = await api.get("/api/tours");
    const tours = response.data?.data ?? [];
    return tours.map((item: any): Tour => ({
      ...item,
      rating_avg: item.rating_avg ? parseFloat(item.rating_avg) : 0,
      total_reviews: item.total_reviews ? parseInt(item.total_reviews, 10) : 0,
      price_min: item.price_min ? parseInt(item.price_min, 10) : 0,
      facilities: item.facilities ?? [],
      cover_url: item.cover_url 
        ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${item.cover_url}`
        : null,
    }));
  } catch (error) {
    console.error("Gagal mengambil data tours:", error);
    return [];
  }
}

/**
 * Mengambil satu Tour berdasarkan ID
 */
export async function getTourById(id: string): Promise<Tour | null> {
  try {
    const response = await api.get(`/api/tours/${id}`);
    const item = response.data?.data;
    if (!item) return null;

    return {
      ...item,
      rating_avg: item.rating_avg ? parseFloat(item.rating_avg) : 0,
      total_reviews: item.total_reviews ? parseInt(item.total_reviews, 10) : 0,
      price_min: item.price_min ? parseInt(item.price_min, 10) : 0,
      facilities: item.facilities ?? [],
      // ✅ PERBAIKAN: Ubah path gambar menjadi URL lengkap
      cover_url: item.cover_url 
        ? `${process.env.NEXT_PUBLIC_API_URL}${item.cover_url}` 
        : null,
    };
  } catch (error) {
    console.error(`Gagal mengambil data tour dengan ID ${id}:`, error);
    return null;
  }
}

/**
 * Ambil semua Influencer
 */
export async function getInfluencers(params?: { q?: string; per_page?: number }) {
  try {
    const response = await api.get("/api/influencers", { params });

    // Pastikan ambil array dari response.data.data
    const list = Array.isArray(response.data?.data) ? response.data.data : [];

    return list.map((item: any): Influencer => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      photo: item.photo,
      instagram: {
        username: item.instagram?.username ?? "",
        followers: Number(item.instagram?.followers ?? 0),
      },
      tiktok: {
        username: item.tiktok?.username ?? "",
        followers: Number(item.tiktok?.followers ?? 0),
      },
    }));
  } catch (error) {
    console.error("Gagal mengambil data influencer:", error);
    return [];
  }
}


/**
 * Ambil detail satu Influencer
 */
export async function getInfluencerById(idOrSlug: string): Promise<Influencer | null> {
  try {
    const response = await api.get(`/api/influencers/${idOrSlug}`);
    const item = response.data?.data;
    if (!item) return null;

    return {
      id: item.id,
      slug: item.slug,
      name: item.name,
      photo: item.photo,
      instagram: {
        username: item.instagram?.username ?? "",
        followers: Number(item.instagram?.followers ?? 0),
      },
      tiktok: {
        username: item.tiktok?.username ?? "",
        followers: Number(item.tiktok?.followers ?? 0),
      },
      meta: item.meta ?? {},
    };
  } catch (error) {
    console.error(`Gagal mengambil influencer ${idOrSlug}:`, error);
    return null;
  }
}

// --- FUNGSI UNTUK MENAMPILKAN KUPON ---

// Tipe untuk parameter filter di getCoupons
export interface CouponFilters {
  page?: number;
  per_page?: number;
  is_active?: boolean;
  discount_type?: DiscountType;
  search?: string;
  culinary_id?: string;
  destination_id?: string;
  expired?: boolean;
}

/**
 * Mengambil daftar kupon dengan pagination dan filter.
 */
export const getCoupons = async (
  filters: CouponFilters = {}
): Promise<PaginatedResponse<Coupon>> => {
  try {
    const response = await api.get("/api/coupons", { params: filters });
    return response.data.data; // ✅ Ini mengambil object paginasi dari dalam
  } catch (error) {
    console.error("Gagal mengambil data kupon:", error);
    throw new Error("Tidak dapat mengambil data kupon.");
  }
};

/**
 * Mengambil detail satu kupon berdasarkan ID.
 */
export const getCouponById = async (id: string): Promise<Coupon> => {
  try {
    const response = await api.get(`/api/coupons/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Gagal mengambil kupon dengan ID ${id}:`, error);
    throw new Error("Tidak dapat mengambil detail kupon.");
  }
};

export const claimCoupon = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await api.post(`/api/coupons/${id}/claim`);
    return response.data;
  } catch (error: any) {
    console.error("Gagal klaim kupon:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Tidak dapat klaim kupon.");
  }
};

export const getMyCoupons = async (): Promise<Coupon[]> => {
  try {
    const response = await api.get("/api/my-coupons"); 
    return response.data.data || [];
  } catch (error: any) {
    console.error("Gagal mengambil kupon user:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Tidak dapat mengambil kupon user.");
  }
};

/**
 * Apply coupon ke cart
 */
export const applyCoupon = async (couponCode: string) => {
  try {
    const response = await api.post("/api/cart/apply-coupon", {
      coupon_code: couponCode,
    });
    return response.data;
  } catch (error: any) {
    console.error("Gagal apply kupon:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Tidak dapat apply kupon.");
  }
};

/**
 * Remove coupon dari cart
 */
export const removeCoupon = async () => {
  try {
    const response = await api.post("/api/cart/remove-coupon");
    return response.data;
  } catch (error: any) {
    console.error("Gagal remove kupon:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Tidak dapat remove kupon.");
  }
};