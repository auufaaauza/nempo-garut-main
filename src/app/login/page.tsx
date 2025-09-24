import LoginClient from "@/components/auth/LoginClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Login atau Daftar - Nempo Garut',
  description: 'Masuk atau buat akun baru di Nempo Garut untuk menikmati semua fitur.',
};

export default function LoginPage() {
  return <LoginClient />;
}