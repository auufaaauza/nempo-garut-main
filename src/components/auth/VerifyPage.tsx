// File: src/components/auth/VerifyPage.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MailCheck, RefreshCw } from "lucide-react";
import { useSearchParams } from "next/navigation";
import api from "@/services/api";

const VerifyPage = () => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("from") || "register"; // default register
  const defaultEmail = searchParams.get("email") || "";
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await api.post("/api/email/resend", { email });
      setMessage(res.data.message);
    } catch (err: any) {
      setMessage(
        err.response?.data?.message ||
          err.response?.data?.errors?.email?.[0] ||
          "Terjadi kesalahan."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg"
      >
        {/* Ikon Email */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
        >
          <MailCheck className="h-10 w-10 text-primary" />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-800">
          {mode === "register" ? "Satu Langkah Lagi!" : "Verifikasi Email Diperlukan"}
        </h1>

        <p className="mt-3 text-base text-gray-600">
          {mode === "register" ? (
            <>
              Pendaftaran Anda berhasil. Kami telah mengirimkan tautan verifikasi ke{" "}
              <span className="font-semibold text-primary">email Anda</span>.  
              Silakan periksa kotak masuk (atau folder spam).
            </>
          ) : (
            <>
              Akun Anda belum diverifikasi. Masukkan email terdaftar Anda untuk
              menerima ulang tautan verifikasi.
            </>
          )}
        </p>

        {/* Mode: Register → tombol resend langsung */}
        {mode === "register" && (
          <div className="mt-8 flex flex-col space-y-3">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/">Kembali ke Beranda</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto flex items-center justify-center gap-2"
              onClick={handleResend}
              disabled={loading}
            >
              <RefreshCw className="h-5 w-5" />
              {loading ? "Mengirim..." : "Kirim Ulang Link Verifikasi"}
            </Button>
          </div>
        )}

        {/* Mode: Login belum verif → form email */}
        {mode === "login" && (
          <div className="mt-8 space-y-4">
            <input
              type="email"
              placeholder="Masukkan email terdaftar"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-primary focus:ring focus:ring-primary/20"
            />
            <Button
              size="lg"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleResend}
              disabled={loading || !email}
            >
              <RefreshCw className="h-5 w-5" />
              {loading ? "Mengirim..." : "Kirim Ulang Link Verifikasi"}
            </Button>
          </div>
        )}

        {message && <p className="mt-4 text-sm text-primary">{message}</p>}
      </motion.div>
    </div>
  );
};

export default VerifyPage;
