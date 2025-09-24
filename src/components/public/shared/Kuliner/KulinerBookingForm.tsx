"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

// ...impor lain tetap sama...
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Skeleton } from '@mui/material';
import { id } from 'date-fns/locale';
import { useCartStore } from '@/stores/cartStore';
import React, { useEffect } from "react";

import { Button as ShadcnButton } from '@/components/ui/button';

import { ShoppingCart, Minus, Plus, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Versi dinamis dari DatePicker
const DynamicDatePicker = dynamic(
  () => import('@mui/x-date-pickers/DatePicker').then(mod => mod.DatePicker),
  {
    ssr: false,
    loading: () => <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: '0.5rem' }} />
  }
);

// ... Tipe Data & Komponen QuantitySelector tetap sama ...
interface MenuItem { id: string | number; name: string; category: string; price: number; }
type BookingData = {
   name: string; 
   email: string; 
   phone_number: string; 
   date: Date | null; 
   orders: { [key: string]: number }; 
  };

interface BookingFormProps {
  menu: MenuItem[];
  bookingData: BookingData;
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>;
  onBooking: () => void;
  totalCost: number;
  errors?: Partial<BookingData & { orders: string }>;
}
const QuantitySelector = ({ value, onChange }: { value: number, onChange: (newVal: number) => void }) => (
  <Box display="flex" alignItems="center" gap={1}>
    <IconButton size="small" sx={{ border: '1px solid #e0e0e0' }} onClick={() => onChange(Math.max(0, value - 1))}>
      <Minus size={16} />
    </IconButton>
    <Typography fontWeight="bold" sx={{ width: '2rem', textAlign: 'center' }}>{value}</Typography>
    <IconButton size="small" sx={{ border: '1px solid #e0e0e0' }} onClick={() => onChange(value + 1)}>
      <Plus size={16} />
    </IconButton>
  </Box>
);

const KulinerBookingForm: React.FC<BookingFormProps> = ({ menu, bookingData, setBookingData, onBooking, totalCost, errors }) => {
  const { user } = useAuth();
  const { addKulinerToCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();

   useEffect(() => {
    if (user) {
      setBookingData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone_number: user.phone_number || prev.phone_number, // default kalau ada
      }));
    }
  }, [user, setBookingData]);

  const groupedMenu = menu.reduce((acc, item) => {
    const category = item.category || 'Lainnya';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as { [key: string]: MenuItem[] });

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const orders = Object.entries(bookingData.orders).filter(([_, qty]) => qty > 0);
      if (orders.length === 0) {
        alert("Pilih minimal 1 menu!");
        setIsSubmitting(false);
        return;
      }

      for (const [menuId, qty] of orders) {
        await addKulinerToCart(menuId, qty as number);
      }

      // ✅ kalau semua sukses
      onBooking?.(true);

      // redirect ke halaman keranjang setelah delay kecil biar smooth
      setTimeout(() => {
        router.push("/keranjang");
      }, 800);
    } catch (err) {
      console.error("Gagal menambahkan kuliner ke keranjang:", err);
      onBooking?.(false);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-5">
      <h3 className="text-2xl text-accent-foreground font-bold">Formulir Pemesanan</h3>

      {/* Input Fields (tetap sama) */}
      <div className="space-y-2">
        <Typography component="label" htmlFor="name" variant="body2" sx={{ fontWeight: 500, color: 'hsl(var(--accent-foreground))' }}>
          <span className='text-accent-foreground'>Nama Lengkap</span>
        </Typography>
        <TextField size="small" fullWidth placeholder="Nama Anda" id="name" value={bookingData.name} onChange={e => setBookingData(p => ({ ...p, name: e.target.value }))} error={!!errors?.name} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.5rem' } }} />
        {errors?.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </div>
      <div className="space-y-2">
        <Typography component="label" htmlFor="email" variant="body2" sx={{ fontWeight: 500, color: 'hsl(var(--accent-foreground))' }}>
          <span className='text-accent-foreground'>Email</span>
        </Typography>
        <TextField size="small" fullWidth type="email" placeholder="email@anda.com" id="email" value={bookingData.email} disabled={!!user} onChange={e => setBookingData(p => ({ ...p, email: e.target.value }))} error={!!errors?.email} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.5rem' } }} />
        {errors?.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Typography component="label" htmlFor="phone" variant="body2" sx={{ fontWeight: 500, color: 'hsl(var(--accent-foreground))' }}>
          <span className='text-accent-foreground'>No. WhatsApp</span>
        </Typography>
        <TextField size="small" fullWidth type="tel" placeholder="08123456789" id="phone"  value={bookingData.phone_number ?? ""} onChange={e => setBookingData(p => ({ ...p, phone_number: e.target.value }))} error={!!errors?.phone_number} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.5rem' } }} />
        {errors?.phone_number && <p className="text-xs text-red-500">{errors.phone_number}</p>}
      </div>
      <div className="space-y-2">
        <Typography component="label" variant="body2" sx={{ fontWeight: 500, color: 'hsl(var(--accent-foreground))' }}>
          <span className='text-accent-foreground'>Tanggal Reservasi</span>
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={id}>
          <DynamicDatePicker
            value={bookingData.date}
            onChange={(newDate) => setBookingData(p => ({ ...p, date: newDate }))}
            disablePast
            enableAccessibleFieldDOMStructure={false}
            slots={{
              textField: (params) => (
                <TextField {...params} size="small" fullWidth error={!!errors?.date}
                  InputProps={{ ...params.InputProps, startAdornment: (<CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />), }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.5rem' } }}
                />
              ),
            }}
          />
        </LocalizationProvider>
        {errors?.date && <p className="text-xs text-red-500">{errors.date}</p>}
      </div>

      {/* --- BAGIAN YANG DIPERBAIKI --- */}
      {menu.length > 0 && (
        <div className="space-y-2">
          <Typography component="label" variant="body2" sx={{ fontWeight: 500, color: 'hsl(var(--accent-foreground))' }}>
            <span className='text-accent-foreground'>Pilih Menu</span>
          </Typography>
          <div className="w-full space-y-2">
            {Object.entries(groupedMenu).map(([category, items]) => (
              <Accordion
                key={category}
                // Style untuk Accordion agar mirip input field
                sx={{
                  border: '1px solid #e0e0e0', // Border abu-abu terang
                  borderRadius: '0.5rem',      // Sudut rounded
                  '&:before': { display: 'none' }, // Hapus garis atas default
                  boxShadow: 'none'             // Hapus shadow
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  // Style untuk header Accordion
                  sx={{
                    minHeight: 40, // Atur tinggi minimal agar mirip input
                    '&.Mui-focusVisible': { backgroundColor: 'action.hover' },
                    '& .MuiAccordionSummary-content': {
                      margin: '10px 0 !important' // Atur margin internal
                    }
                  }}
                >
                  {/* Style untuk teks kategori */}
                  <Typography sx={{ color: 'hsl(var(--accent-foreground))', fontSize: '0.875rem' }}>
                    <span className='text-accent-foreground'>{category}</span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="px-3 pb-3">
                  <div className="space-y-2 pt-2 border-t">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                        <div>
                          <p className="text-sm  text-accent-foreground font-medium leading-none">{item.name}</p>
                          <p className="text-xs text-gray-600">Rp {item.price.toLocaleString('id-ID')}</p>
                        </div>
                        <QuantitySelector value={bookingData.orders[item.id] || 0} onChange={qty => setBookingData(prev => ({ ...prev, orders: { ...prev.orders, [item.id]: qty } }))} />
                      </div>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
          {errors?.orders && <p className="text-xs text-red-500 pt-1">{errors.orders}</p>}
        </div>
      )}
      {/* --- AKHIR BAGIAN YANG DIPERBAIKI --- */}

      {/* Total (tetap sama) */}
      <div className="!mt-6 pt-4 border-t">
        <div className="flex justify-between items-center text-lg">
          <span className="font-semibold text-accent-foreground">Total Pembayaran</span>
          <span className="font-bold text-primary text-xl">Rp {totalCost.toLocaleString('id-ID')}</span>
        </div>
      </div>

      <ShadcnButton size="lg" className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Memproses...
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-5 w-5" />
            {user ? 'Tambah ke Pesanan' : 'Login untuk Memesan'}
          </>
        )}
      </ShadcnButton>

    </div>
  );
}

export default KulinerBookingForm;