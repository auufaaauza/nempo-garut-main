// File: src/app/verify/page.tsx

import { Suspense } from 'react';
import type { Metadata } from "next";

// ✅ Nama impor dan path file sudah konsisten
import SuccesRegister from "@/components/auth/VerifyPage"; 

// ✅ Metadata sudah sesuai dengan konten halaman
export const metadata: Metadata = {
  title: 'Pendaftaran Berhasil - Nempo Garut',
  description: 'Satu langkah lagi! Verifikasi email Anda untuk mengaktifkan akun.',
};

// Komponen fallback sederhana untuk Suspense
const LoadingFallback = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <p>Loading...</p>
    </div>
  );
};

export default function VerifyPage() {
  return (
    // ✅ Komponen dibungkus dengan Suspense untuk mencegah error build
    <Suspense fallback={<LoadingFallback />}>
      <SuccesRegister />
    </Suspense>
  );
}