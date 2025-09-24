"use client";

import React, { useEffect } from 'react'; // Ditambahkan useEffect
import dynamic from 'next/dynamic';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// --- Komponen dari MUI ---
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Skeleton } from '@mui/material';
// --- IMPOR YANG DIKEMBALIKAN/DIPERBAIKI ---
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// --- Komponen dari shadcn/ui (HANYA Button sesuai permintaan) ---
import { Button } from '@/components/ui/button';

// --- Ikon dari Lucide ---
import { ShoppingCart, Minus, Plus, Calendar as CalendarIcon } from 'lucide-react';

// --- DEFINISI DYNAMIC DATE PICKER (KEMBALI DIGUNAKAN) ---
const DynamicDatePicker = dynamic(
  () => import('@mui/x-date-pickers/DatePicker').then(mod => mod.DatePicker),
  { 
    ssr: false,
    loading: () => <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: '0.5rem' }} />
  }
);

// Tipe Data
interface BookingFormProps {
    bookingData: any;
    setBookingData: Function;
    destination: any;
    dayType: 'weekday' | 'weekend';
    prices: { adult: number; child: number };
    totalCost: number;
    onBooking: () => void;
    errors: any;
}

// QuantitySelector dengan style shadcn/ui
const QuantitySelector = ({ value, onChange }: { value: number, onChange: (newVal: number) => void }) => (
    <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => onChange(Math.max(0, value - 1))}>
            <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center font-bold">{value}</span>
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => onChange(value + 1)}>
            <Plus className="h-4 w-4" />
        </Button>
    </div>
);


const TicketBookingForm: React.FC<BookingFormProps> = ({ 
    bookingData, setBookingData, destination, dayType, prices, totalCost, onBooking, errors 
}) => {
    const { user } = useAuth();

    // --- BAGIAN YANG DITAMBAHKAN ---
    useEffect(() => {
        // Saat user sudah login (objek user ada), isi form secara otomatis.
        if (user) {
            setBookingData((prevData: any) => ({
                ...prevData,
                name: user.name || prevData.name,
                email: user.email || prevData.email,
                phone: user.phone_number || prevData.phone,
            }));
        }
    }, [user, setBookingData]); // Efek ini hanya akan berjalan saat 'user' atau 'setBookingData' berubah.
    // --- AKHIR BAGIAN YANG DITAMBAHKAN ---

    // Helper functions (TIDAK DIUBAH)
    const handleStateChange = (field: string, value: any) => setBookingData((prev: any) => ({ ...prev, [field]: value }));
    const handleTicketChange = (type: 'adult' | 'child', value: number) => setBookingData((prev: any) => ({ ...prev, tickets: { ...prev.tickets, [type]: value } }));
    const handleOutboundChange = (name: string, quantity: number) => setBookingData((prev: any) => ({ ...prev, outboundChoices: { ...prev.outboundChoices, [name]: quantity } }));

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-5">
            <h3 className="text-2xl font-bold text-accent-foreground">Formulir Pemesanan</h3>
            
            <div className="space-y-2">
                <Typography component="label" htmlFor="name" variant="body2" sx={{ fontWeight: 500, color: 'hsl(var(--accent-foreground))' }}>
                    <span className='text-accent-foreground'>Nama Lengkap</span>
                </Typography>
                <TextField size="small" fullWidth placeholder="Nama Anda" id="name" value={bookingData.name} onChange={e => handleStateChange('name', e.target.value)} error={!!errors.name} helperText={errors.name} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.5rem' } }}/>
            </div>

            <div className="space-y-2">
                <Typography component="label" htmlFor="email" variant="body2" sx={{ fontWeight: 500, color: 'hsl(var(--accent-foreground))' }}>
                    <span className='text-accent-foreground'>Email</span>
                </Typography>
                <TextField size="small" fullWidth type="email" placeholder="email@anda.com" id="email" value={bookingData.email} disabled={!!user} onChange={e => handleStateChange('email', e.target.value)} error={!!errors.email} helperText={errors.email} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.5rem' } }}/>
            </div>

            <div className="space-y-2">
                <Typography component="label" htmlFor="phone" variant="body2" sx={{ fontWeight: 500, color: 'hsl(var(--accent-foreground))' }}>
                    <span className='text-accent-foreground'>No. WhatsApp</span>
                </Typography>
                <TextField size="small" fullWidth type="tel" placeholder="08123456789" id="phone" value={bookingData.phone} onChange={e => handleStateChange('phone', e.target.value)} error={!!errors.phone} helperText={errors.phone} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.5rem' } }}/>
            </div>

            {/* --- BAGIAN DATE PICKER (DIGANTI KEMBALI KE MUI) --- */}
            <div className="space-y-2">
                <Typography component="label" variant="body2" sx={{ fontWeight: 500, color: 'hsl(var(--accent-foreground))' }}>
                    <span className='text-accent-foreground'>Tanggal Kunjungan</span>
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={id}>
                    <DynamicDatePicker
                        value={bookingData.date}
                        onChange={(newDate) => handleStateChange('date', newDate)}
                        disablePast
                        enableAccessibleFieldDOMStructure={false}
                        slots={{
                            textField: (params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    fullWidth
                                    error={!!errors.date}
                                    helperText={errors.date}
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                                        ),
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.5rem' } }}
                                />
                            ),
                        }}
                    />
                </LocalizationProvider>
                {/* Error message di-handle oleh `helperText` di dalam TextField */}
            </div>

            {/* Bagian Tiket Masuk */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <Typography component="p" variant="body2" sx={{ fontWeight: 500, color: 'hsl(var(--accent-foreground))' }}>
                        <span className='text-accent-foreground'>Jumlah Tiket Masuk</span>
                    </Typography>
                    <div className={`text-xs font-bold px-2 py-1 rounded-full ${dayType === 'weekday' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {dayType === 'weekday' ? 'Harga Hari Biasa' : 'Harga Akhir Pekan'}
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-sm text-accent-foreground">Dewasa</p>
                            <p className="text-sm text-primary font-semibold">Rp {prices.adult.toLocaleString('id-ID')}</p>
                        </div>
                        <QuantitySelector value={bookingData.tickets.adult} onChange={(val) => handleTicketChange('adult', val)} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-sm text-accent-foreground">Anak</p>
                            <p className="text-sm text-primary font-semibold">Rp {prices.child.toLocaleString('id-ID')}</p>
                        </div>
                        <QuantitySelector value={bookingData.tickets.child} onChange={(val) => handleTicketChange('child', val)} />
                    </div>
                </div>
                {errors.tickets && <p className="text-xs text-red-500 mt-2">{errors.tickets}</p>}
            </div>

            {/* Tambah Wahana */}
            {destination.outbound && destination.outbound.length > 0 && (
                <div>
                    <Typography component="p" variant="body2" sx={{ fontWeight: 500, color: 'hsl(var(--accent-foreground))' }}>Tambah Wahana (Opsional)</Typography>
                    <div className="space-y-2 mt-2">
                        {destination.outbound.map((item: any) => (
                            <div key={item.name} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                <div>
                                    <p className="text-sm font-medium leading-none text-accent-foreground">{item.name}</p>
                                    <p className="text-xs text-gray-600">Rp {item.price.toLocaleString('id-ID')}</p>
                                </div>
                                <QuantitySelector value={bookingData.outboundChoices[item.name] || 0} onChange={(val) => handleOutboundChange(item.name, val)} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Total Pembayaran */}
            <div className="!mt-6 pt-4 border-t">
                <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold text-accent-foreground">Total Pembayaran</span>
                    <span className="font-bold text-primary text-xl">Rp {totalCost.toLocaleString('id-ID')}</span>
                </div>
            </div>

            {/* Tombol dari @/components/ui/button */}
            <Button size="lg" className="w-full" onClick={onBooking}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                {user ? 'Tambah ke Pesanan' : 'Login untuk Memesan'}
            </Button>
       </div>
    );
}

export default TicketBookingForm;

