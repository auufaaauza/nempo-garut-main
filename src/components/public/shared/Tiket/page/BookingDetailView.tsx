"use client";

import React, { useState, useEffect, useRef } from 'react';
import type { FC, ElementType, SyntheticEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { isWeekend, addDays, format } from 'date-fns';

// MUI
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

// Komponen lokal
import BookingForm from '../TicketBookingForm';

// ✅ Import store cart
import { useCartStore } from '@/stores/cartStore';

interface Destination {
  id: string;
  name: string;
  images: string[];
  description: string;
  coords: [number, number];
  facilities: { icon: ElementType; text: string }[];
  prices: {
    weekday: { adult: number; child: number };
    weekend: { adult: number; child: number };
  };
  outbound: { name: string; price: number }[];
}

interface BookingData {
  date: Date | undefined | null;
  tickets: { adult: number; child: number };
  outboundChoices: Record<string, number>;
  name: string;
  phone: string;
  email: string;
}

type FormErrors = Partial<Record<keyof BookingData | 'tickets', string>>;

interface BookingDetailViewProps {
  destination: Destination;
  onClose: () => void;
}

const BookingDetailView: FC<BookingDetailViewProps> = ({ destination, onClose }) => {
  const { addTicketToCart } = useCartStore();

  const [bookingData, setBookingData] = useState<BookingData>({
    date: addDays(new Date(), 1),
    tickets: { adult: 1, child: 0 },
    outboundChoices: {},
    name: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [currentTab, setCurrentTab] = useState<string>('deskripsi');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' as 'info' | 'success' | 'warning' | 'error' });

  // animasi
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageContainerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  // hitung harga
  const dayType = isWeekend(bookingData.date || new Date()) ? 'weekend' : 'weekday';
  const prices = destination.prices[dayType];
  const totalCost =
    bookingData.tickets.adult * prices.adult +
    bookingData.tickets.child * prices.child;

  // validasi
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!bookingData.name.trim()) newErrors.name = "Nama lengkap wajib diisi.";
    if (!bookingData.phone.trim()) newErrors.phone = "No. WhatsApp wajib diisi.";
    if (!bookingData.email.trim()) newErrors.email = "Email wajib diisi.";
    if (!bookingData.date) newErrors.date = "Tanggal wajib dipilih.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingAttempt = async () => {
    if (!validateForm()) {
      setSnackbar({ open: true, message: 'Harap periksa kembali formulir Anda.', severity: 'warning' });
      return;
    }

    try {
      await addTicketToCart({
        destination_id: destination.id,
        visit_date: format(bookingData.date!, "yyyy-MM-dd"),
        qty_adult: bookingData.tickets.adult,
        qty_child: bookingData.tickets.child,
        price_adult: prices.adult,
        price_child: prices.child,
        outbound: Object.entries(bookingData.outboundChoices)
          .filter(([_, qty]) => qty > 0)
          .map(([name, qty]) => {
            const item = destination.outbound.find((o) => o.name === name);
            return { name, price: item?.price || 0, quantity: qty };
          }),
      });

      setSnackbar({ open: true, message: '✅ Tiket berhasil ditambahkan ke keranjang', severity: 'success' });
      // opsional: redirect ke /keranjang
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Gagal menambahkan tiket', severity: 'error' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container py-8">
      <Button variant="outlined" onClick={onClose} sx={{ mb: 3, borderRadius: '9999px', textTransform: 'none', gap: 0.5 }}>
        <ChevronLeftIcon sx={{ fontSize: '1rem' }} /> Kembali ke Daftar Tiket
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div ref={imageContainerRef} className="h-96 overflow-hidden rounded-2xl">
            <motion.img className="w-full h-[140%] object-cover" alt={`Pemandangan utama ${destination.name}`} src={destination.images[1] || destination.images[0]} style={{ y }} />
          </div>

          <Box sx={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '12px', p: 2, bgcolor: 'white' }}>
            <Tabs value={currentTab} onChange={(_, v) => setCurrentTab(v)} centered>
              <Tab icon={<DescriptionIcon />} iconPosition="start" label="Deskripsi" value="deskripsi" />
              <Tab icon={<BusinessCenterIcon />} iconPosition="start" label="Fasilitas" value="fasilitas" />
              <Tab icon={<ConfirmationNumberIcon />} iconPosition="start" label="Harga Tiket" value="tiket" />
            </Tabs>
          </Box>
        </div>

        <div className="lg:col-span-1 sticky top-24">
          <BookingForm
            bookingData={bookingData}
            setBookingData={setBookingData}
            destination={destination}
            dayType={dayType}
            prices={prices}
            totalCost={totalCost}
            onBooking={handleBookingAttempt}
            errors={errors}
          />
        </div>
      </div>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default BookingDetailView;
