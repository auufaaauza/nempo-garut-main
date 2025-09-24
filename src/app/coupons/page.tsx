// app/profile/coupons/page.tsx (Contoh path)

import MyCouponsPage from "@/components/auth/Profile/Coupons/Coupons";
import type { Metadata } from "next"; // 👈 Impor tipe Metadata

// 👇 Tambahkan objek metadata
export const metadata: Metadata = {
  title: "Kupon Saya - Profil",
  description: "Lihat dan kelola semua kupon yang telah Anda klaim.",
};

export default function ProfileCouponsPage() {
  return <MyCouponsPage />;
}