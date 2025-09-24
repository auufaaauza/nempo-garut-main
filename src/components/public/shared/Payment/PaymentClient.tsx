"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

// MUI & Lucide
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { ArrowLeft, Lock } from "lucide-react";

declare global {
  interface Window {
    snap: any;
  }
}

function loadSnapOnce(clientKey: string, isProduction = false) {
  return new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("window undefined"));
    if (window.snap) return resolve();

    const script = document.createElement("script");
    script.src = isProduction
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js";
    script.async = true;
    script.setAttribute("data-client-key", clientKey);
    script.onload = () => (window.snap ? resolve() : reject(new Error("window.snap tidak tersedia")));
    script.onerror = () => reject(new Error("Gagal memuat Snap.js"));
    document.body.appendChild(script);
  });
}

const PaymentProcessor: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useAuth() as any;
  const { toast } = useToast();

  const [isProcessing, setIsProcessing] = useState(true);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    if (isLoading) return; // tunggu auth selesai
    startedRef.current = true;

    (async () => {
      try {
        if (!user) {
          toast({ title: "Silakan login dahulu", variant: "destructive" });
          router.push("/login");
          return;
        }

        const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";
        if (!clientKey) {
          toast({
            title: "Konfigurasi Midtrans belum lengkap",
            description: "NEXT_PUBLIC_MIDTRANS_CLIENT_KEY kosong",
            variant: "destructive",
          });
          router.push("/keranjang");
          return;
        }
        const FE_PROD = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true";
        await loadSnapOnce(clientKey, FE_PROD);

        // 🔹 Mode 1: Bayar ulang order existing
        const orderIdParam = searchParams.get("order");
        if (orderIdParam) {
          const resp = await api.post(`/api/orders/${orderIdParam}/pay`);
          const { snapToken, redirect_url } = resp.data || {};

          if (!snapToken) {
            if (redirect_url) {
              window.location.href = redirect_url;
              return;
            }
            throw new Error("Snap token kosong dari server");
          }

          window.snap.pay(snapToken, {
            onSuccess: (result: any) => {
              router.push(`/thanks?order_id=${result?.order_id || orderIdParam}&status=success`);
            },
            onPending: (result: any) => {
              router.push(`/thanks?order_id=${result?.order_id || orderIdParam}&status=pending`);
            },
            onError: (err: any) => {
              console.error("Snap error:", err);
              toast({ title: "Pembayaran gagal", variant: "destructive" });
              router.push("/pesanan-saya");
            },
            onClose: () => {
              toast({
                title: "Pembayaran ditutup",
                description: "Anda bisa coba lagi dari halaman pesanan.",
              });
              router.push("/pesanan-saya");
            },
          });
          return;
        }

        // 🔹 Mode 2: Checkout dari cart
        const cartDataString = searchParams.get("data");
        if (!cartDataString) {
          toast({ title: "Data tidak valid", variant: "destructive" });
          router.push("/keranjang");
          return;
        }

        const cartData = JSON.parse(decodeURIComponent(cartDataString));

        const items =
          (cartData?.cartGroups || []).flatMap((group: any) => {
            if (group?.type === "KULINER") {
              return (group.items || []).map((it: any) => ({
                id: String(it.cart_item_id),
                price: Number(it.price ?? 0),
                quantity: Number(it.quantity ?? 0),
                name: String(it.menu_name ?? "Item"),
              }));
            }

            const raw = String(group.cart_group_id || "");
            const ticketCartItemId = Number(raw.replace(/^ticket-/, ""));
            const destName = group?.ticket?.destination?.name ?? "Tiket Wisata";

            return [
              {
                id: String(ticketCartItemId),
                price: Number(group.total_price || 0),
                quantity: 1,
                name: `Tiket ${destName}`,
              },
            ];
          }) ?? [];

        const grossAmount = items.reduce(
          (sum: number, it: any) => sum + Number(it.price || 0) * Number(it.quantity || 0),
          0
        );

        if (!items.length || !grossAmount) {
          toast({ title: "Keranjang kosong / total tidak valid", variant: "destructive" });
          router.push("/keranjang");
          return;
        }

        const payload = {
          items,
          customer: {
            first_name: user?.name ?? "User",
            email: user?.email ?? "user@example.com",
          },
          grossAmount,
        };

        const resp = await api.post("/api/checkout", payload);
        const { snapToken, order_id: orderIdFromResp, orderId, redirect_url } = resp.data || {};
        const resolvedOrderId = orderIdFromResp || orderId;

        if (!snapToken) {
          if (redirect_url) {
            window.location.href = redirect_url;
            return;
          }
          throw new Error("Snap token kosong dari server");
        }

        window.snap.pay(snapToken, {
          onSuccess: (result: any) => {
            router.push(`/thanks?order_id=${result?.order_id || resolvedOrderId}&status=success`);
          },
          onPending: (result: any) => {
            router.push(`/thanks?order_id=${result?.order_id || resolvedOrderId}&status=pending`);
          },
          onError: (err: any) => {
            console.error("Snap error:", err);
            toast({ title: "Pembayaran gagal", variant: "destructive" });
            router.push("/keranjang");
          },
          onClose: () => {
            toast({
              title: "Pembayaran ditutup",
              description: "Anda bisa coba lagi dari halaman keranjang.",
            });
            router.push("/keranjang");
          },
        });
      } catch (e: any) {
        console.error("Checkout error:", e?.response?.data || e);
        const msg = e?.response?.data?.error || e?.message || "Gagal memproses pembayaran";
        toast({ title: "Gagal Membuat Transaksi", description: msg, variant: "destructive" });
        router.push("/keranjang");
      } finally {
        setIsProcessing(false);
      }
    })();
  }, [isLoading, user]);

  if (isProcessing || isLoading) {
    return (
      <Box textAlign="center">
        <CircularProgress />
        <Typography mt={2} color="text.secondary">
          Mempersiapkan pembayaran...
        </Typography>
      </Box>
    );
  }

  return null;
};

const PaymentClient: React.FC = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto py-20 min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border animate-fade-in">
        <Button
          variant="text"
          onClick={() => router.push("/keranjang")}
          startIcon={<ArrowLeft />}
          className="mb-4"
        >
          Kembali ke Keranjang
        </Button>

        <div className="text-center">
          <div className="mb-6">
            <Lock className="mx-auto mb-4 text-blue-600" size={48} />
            <h1 className="text-2xl font-bold mb-2">Selesaikan Pembayaran</h1>
            <p className="text-gray-500">
              Anda akan dialihkan ke halaman pembayaran Midtrans yang aman.
            </p>
          </div>

          <Suspense
            fallback={
              <Box textAlign="center">
                <CircularProgress />
                <Typography mt={2}>Memuat...</Typography>
              </Box>
            }
          >
            <PaymentProcessor />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default PaymentClient;
