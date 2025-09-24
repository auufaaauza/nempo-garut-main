// components/public/shared/Tiket/TicketDetailClient.tsx
"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Destination } from "@/types/destination";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { ChevronLeft, FileText, Briefcase, Ticket as TicketIcon } from "lucide-react";
import Image from "next/image";
import { format, isWeekend } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import TicketBookingForm from "./TicketBookingForm"; // ⬅️ import form

const TicketDetailClient = ({ destination }: { destination: Destination }) => {
  const router = useRouter();
  const { user, token } = useAuth() as any;

  const [tab, setTab] = useState(0);

  // Parallax
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const imgSrc = destination.image || "/images/placeholder1.jpg";

  // =========================
  // Booking state (form)
  // =========================
  const [bookingData, setBookingData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    date: new Date(),
    tickets: { adult: 1, child: 0 },
    outboundChoices: {} as Record<string, number>, // { 'Flying Fox': 2, ... }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Tentukan hari: weekday / weekend
  const dayType = useMemo<"weekday" | "weekend">(() => {
    return isWeekend(bookingData.date) ? "weekend" : "weekday";
  }, [bookingData.date]);

  // Harga dasar
  const prices = useMemo(() => {
    const p = destination.prices || {};
    return {
      adult: p?.[dayType]?.adult ?? 0,
      child: p?.[dayType]?.child ?? 0,
    };
  }, [destination.prices, dayType]);

  // Total biaya
  const totalCost = useMemo(() => {
    const ticketTotal =
      (bookingData.tickets.adult || 0) * (prices.adult || 0) +
      (bookingData.tickets.child || 0) * (prices.child || 0);

    const outboundTotal = (destination.outbound || []).reduce((sum, item) => {
      const qty = bookingData.outboundChoices[item.name] || 0;
      return sum + qty * (item.price || 0);
    }, 0);

    return ticketTotal + outboundTotal;
  }, [bookingData, prices, destination.outbound]);

  // Validasi sederhana
  const validate = () => {
    const e: Record<string, string> = {};
    if (!bookingData.name?.trim()) e.name = "Nama wajib diisi";
    if (!bookingData.email?.trim()) e.email = "Email wajib diisi";
    if (!bookingData.phone?.trim()) e.phone = "No. WhatsApp wajib diisi";
    if (!bookingData.date) e.date = "Tanggal wajib dipilih";
    if ((bookingData.tickets.adult || 0) + (bookingData.tickets.child || 0) <= 0) {
      e.tickets = "Minimal 1 tiket";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Submit → kirim ke backend, lalu ke /keranjang
  const onBooking = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!validate()) return;

    try {
      // Susun payload ringkas
      const visitDate = format(bookingData.date, "yyyy-MM-dd", { locale: localeID });

      const payload = {
        destination_id: destination.id,
        visit_date: visitDate,
        tickets: {
          adult: bookingData.tickets.adult,
          child: bookingData.tickets.child,
          price_adult: prices.adult,
          price_child: prices.child,
        },
        outbound: (destination.outbound || []).map((o) => ({
          name: o.name,
          price: o.price,
          quantity: bookingData.outboundChoices[o.name] || 0,
        })),
        contact: {
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
        },
        total: totalCost,
      };

      // Endpoint asumsi:
      // - Kamu bisa buat /api/tickets/cart untuk memasukkan item ke cart (type: 'TIKET')
      //   atau langsung /api/tickets/orders jika mau langsung transaksi.
      await api.post("/api/tickets/cart", payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      router.push("/keranjang");
    } catch (err) {
      console.error("Booking gagal:", err);
      // (opsional) tampilkan toast kalau punya
      alert("Gagal menambahkan ke keranjang. Coba lagi ya.");
    }
  };

  return (
    <motion.div
      className="container mx-auto py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Button
        variant="outlined"
        onClick={() => router.back()}
        startIcon={<ChevronLeft />}
        sx={{ mb: 3, borderRadius: "9999px" }}
      >
        Kembali ke Daftar Tiket
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 mb-80 space-y-8">
          <div ref={imageContainerRef} className="h-96 overflow-hidden rounded-2xl relative">
            <motion.div className="w-full h-[140%] absolute top-[-20%]" style={{ y }}>
              <Image
                src={imgSrc}
                alt={destination.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </motion.div>
          </div>

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth">
              <Tab label="Deskripsi" icon={<FileText />} iconPosition="start" />
              <Tab label="Fasilitas" icon={<Briefcase />} iconPosition="start" />
              <Tab label="Harga Tiket" icon={<TicketIcon />} iconPosition="start" />
            </Tabs>
          </Box>

          {tab === 0 && (
            <Typography sx={{ p: 2, lineHeight: 1.8 }}>
              {destination.description || "Belum ada deskripsi."}
            </Typography>
          )}

          {tab === 1 && (
            <Box sx={{ p: 2 }}>
              {Array.isArray(destination.facilities) && destination.facilities.length > 0 ? (
                <ul className="list-disc ml-6 space-y-1">
                  {destination.facilities.map((f, i) => (
                    <li key={i}>{(f as any).text || String(f)}</li>
                  ))}
                </ul>
              ) : (
                <Typography color="text.secondary">Fasilitas belum tersedia.</Typography>
              )}
            </Box>
          )}

          {tab === 2 && (
            <Box sx={{ p: 2 }}>
              {destination.prices ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Box className="rounded-xl border p-4">
                    <Typography fontWeight="bold" mb={1}>
                      Weekday
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Dewasa: Rp {(destination.prices.weekday?.adult ?? 0).toLocaleString("id-ID")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Anak: Rp {(destination.prices.weekday?.child ?? 0).toLocaleString("id-ID")}
                    </Typography>
                  </Box>
                  <Box className="rounded-xl border p-4">
                    <Typography fontWeight="bold" mb={1}>
                      Weekend
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Dewasa: Rp {(destination.prices.weekend?.adult ?? 0).toLocaleString("id-ID")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Anak: Rp {(destination.prices.weekend?.child ?? 0).toLocaleString("id-ID")}
                    </Typography>
                  </Box>
                </div>
              ) : (
                <Typography color="text.secondary">Harga belum tersedia.</Typography>
              )}
            </Box>
          )}
        </div>

        <div className="lg:col-span-1 sticky mb-15 top-24">
          <TicketBookingForm
            bookingData={bookingData}
            setBookingData={setBookingData}
            destination={destination}
            dayType={dayType}
            prices={prices}
            totalCost={totalCost}
            onBooking={onBooking}
            errors={errors}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TicketDetailClient;
