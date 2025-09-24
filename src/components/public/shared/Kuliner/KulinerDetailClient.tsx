"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import type { CulinaryItem, Menu } from '@/lib/data';
import { useCartStore } from '@/stores/cartStore';

// MUI & Lucide Imports
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { ChevronLeft, FileText, Briefcase, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import KulinerBookingForm from './KulinerBookingForm';

const KulinerDetailClient = ({ culinary }: { culinary: CulinaryItem }) => {
    const router = useRouter();
    const { user } = useAuth();
    const { toast } = useToast();
    const [tab, setTab] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false); // State untuk loading

    // const addKulinerToCart = useCartStore((state) => state.addToCart);
    const { addKulinerToCart } = useCartStore();

    const [bookingData, setBookingData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        date: null as Date | null,
        orders: {} as { [key: string]: number }
    });

    const imageContainerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: imageContainerRef, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    useEffect(() => {
        if (user) {
            setBookingData(prev => ({ ...prev, email: user.email, name: user.name }));
        }
    }, [user]);

    const menu = culinary.menus || [];
    const totalCost = menu.reduce((acc: number, item: Menu) => acc + item.price * (bookingData.orders[item.id] || 0), 0);

    const handleBooking = async () => {
        if (!user) {
            toast({ title: "Harap Login", description: "Anda harus login untuk memesan." });
            router.push('/login');
            return;
        }

        const orderedItems = Object.entries(bookingData.orders).filter(([id, qty]) => qty > 0);
        if (orderedItems.length === 0) {
            toast({ variant: "destructive", title: "Pilih Menu", description: "Anda harus memilih minimal satu menu." });
            return;
        }

        setIsSubmitting(true);

        try {
            // pastikan pakai addKulinerToCart
            await Promise.all(
                orderedItems.map(([menuId, quantity]) =>
                    addKulinerToCart(menuId, quantity)
                )
            );

            toast({
                title: "✅ Berhasil Ditambahkan",
                description: "Pesananmu udah masuk keranjang.",
            });

            // test dulu tanpa push
            router.push('/keranjang');
        } catch (error: any) {
            console.error("HandleBooking error:", error);
            toast({
                variant: "destructive",
                title: "Gagal Menambah Pesanan",
                description: error?.response?.data?.message || error.message || "Terjadi kesalahan saat menambah item.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto pb-20 py-8">
            <Button variant="outlined" onClick={() => router.back()} startIcon={<ChevronLeft />} sx={{ mb: 3, borderRadius: '9999px' }}>
                Kembali
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <div ref={imageContainerRef} className="h-96 overflow-hidden rounded-2xl relative">
                        <motion.div className="w-full h-[140%] absolute top-[-20%]" style={{ y }}>
                            <Image src={culinary.image_url} alt={culinary.name} fill style={{ objectFit: 'cover' }} />
                        </motion.div>
                    </div>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} variant="fullWidth">
                            <Tab label="Deskripsi" icon={<FileText />} iconPosition="start" />
                            <Tab label="Fasilitas" icon={<Briefcase />} iconPosition="start" />
                            <Tab label="Menu" icon={<ShoppingCart />} iconPosition="start" />
                        </Tabs>
                    </Box>

                    {tab === 0 && <Typography sx={{ p: 2, lineHeight: 1.8 }}>{culinary.description || 'Deskripsi tidak tersedia.'}</Typography>}
                    {tab === 1 && <Box sx={{ p: 2 }}>{(culinary.facilities || []).map((facility, index) => <span key={index} className="inline-block bg-gray-100 p-2 rounded-lg text-sm mr-2 mb-2">{facility.name}</span>)}</Box>}
                    {tab === 2 && <Typography sx={{ p: 2 }}>Silakan pilih menu pada formulir pemesanan di samping untuk melihat rinciannya.</Typography>}
                </div>

                <div className="lg:col-span-1 sticky top-24">
                    <KulinerBookingForm
                        menu={menu}
                        bookingData={bookingData}
                        setBookingData={setBookingData}
                        onBooking={handleBooking}
                        totalCost={totalCost}
                        isSubmitting={isSubmitting} // Kirim status loading ke form
                    />
                </div>
            </div>
        </div>
    );
};

export default KulinerDetailClient;
