"use client";

import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { BookOpen, Search, Volume2, Mic, MessageSquare, BarChart3, ChevronDown, Filter } from 'lucide-react';

// [MODIFIKASI] Tombol kategori sekarang dari component/ui
import { Button } from '@/components/ui/button'; 

// Komponen MUI yang tetap digunakan
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import PageLayout from '@/components/public/common/AnimatedPageLayout';
import { useTranslation } from 'react-i18next';

// [BARU] Import komponen MUI Select untuk filter mobile
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useToast } from '@/hooks/use-toast';


// === Tipe Data & Data Kamus/Percakapan (Tidak diubah) ===
interface DictionaryWord {
  sunda: string;
  indonesia: string;
  kategori: string;
}
interface ConversationPhrase {
  sunda: string;
  indonesia: string;
}
interface ConversationCategory {
  [key: string]: ConversationPhrase[];
}
const dictionaryData: DictionaryWord[] = [
  // ... data kamus Anda tetap sama ...
  { sunda: 'Wilujeng enjing', indonesia: 'Selamat pagi', kategori: 'Sapaan' },
  { sunda: 'Wilujeng siang', indonesia: 'Selamat siang', kategori: 'Sapaan' },
  { sunda: 'Wilujeng sonten', indonesia: 'Selamat sore', kategori: 'Sapaan' },
  { sunda: 'Wilujeng wengi', indonesia: 'Selamat malam', kategori: 'Sapaan' },
  { sunda: 'Kumaha damang?', indonesia: 'Bagaimana kabar?', kategori: 'Sapaan' },
  { sunda: 'Pangesto', indonesia: 'Baik (jawaban)', kategori: 'Sapaan' },
  { sunda: 'Hatur nuhun', indonesia: 'Terima kasih', kategori: 'Umum' },
  { sunda: 'Sami-sami', indonesia: 'Sama-sama', kategori: 'Umum' },
  { sunda: 'Punten', indonesia: 'Permisi / Maaf', kategori: 'Umum' },
  { sunda: 'Mangga', indonesia: 'Silakan', kategori: 'Umum' },
  { sunda: 'Leres', indonesia: 'Benar', kategori: 'Umum' },
  { sunda: 'Sanes', indonesia: 'Bukan', kategori: 'Umum' },
  { sunda: 'Sabaraha hargana?', indonesia: 'Berapa harganya?', kategori: 'Belanja' },
  { sunda: 'Tiasa nawis?', indonesia: 'Bisa menawar?', kategori: 'Belanja' },
  { sunda: 'Abdi mésér ieu', indonesia: 'Saya beli ini', kategori: 'Belanja' },
  { sunda: 'Mahal teuing', indonesia: 'Terlalu mahal', kategori: 'Belanja' },
  { sunda: 'Di mana toilet?', indonesia: 'Di mana toilet?', kategori: 'Arah' },
  { sunda: 'Lempeng', indonesia: 'Lurus', kategori: 'Arah' },
  { sunda: 'Kénca', indonesia: 'Kiri', kategori: 'Arah' },
  { sunda: 'Katuhu', indonesia: 'Kanan', kategori: 'Arah' },
  { sunda: 'Raos pisan', indonesia: 'Enak sekali', kategori: 'Makanan' },
  { sunda: 'Lada', indonesia: 'Pedas', kategori: 'Makanan' },
  { sunda: 'Amis', indonesia: 'Manis', kategori: 'Makanan' },
  { sunda: 'Asin', indonesia: 'Asin', kategori: 'Makanan' },
  { sunda: 'Indung', indonesia: 'Ibu', kategori: 'Keluarga' },
  { sunda: 'Bapa', indonesia: 'Ayah', kategori: 'Keluarga' },
  { sunda: 'Lanceuk', indonesia: 'Kakak', kategori: 'Keluarga' },
  { sunda: 'Adi', indonesia: 'Adik', kategori: 'Keluarga' },
  { sunda: 'Geulis', indonesia: 'Cantik', kategori: 'Sifat' },
  { sunda: 'Kasép', indonesia: 'Tampan', kategori: 'Sifat' },
  { sunda: 'Bageur', indonesia: 'Baik hati', kategori: 'Sifat' },
  { sunda: 'Pinter', indonesia: 'Pintar', kategori: 'Sifat' },
  { sunda: 'Gunung', indonesia: 'Gunung', kategori: 'Alam' },
  { sunda: 'Sawah', indonesia: 'Sawah', kategori: 'Alam' },
  { sunda: 'Curug', indonesia: 'Air terjun', kategori: 'Alam' },
  { sunda: 'Cai', indonesia: 'Air', kategori: 'Alam' },
  { sunda: 'Hujan', indonesia: 'Hujan', kategori: 'Alam' },
  { sunda: 'Bogoh', indonesia: 'Cinta / Suka', kategori: 'Perasaan' },
  { sunda: 'Sono', indonesia: 'Rindu', kategori: 'Perasaan' },
  { sunda: 'Bungah', indonesia: 'Senang / Bahagia', kategori: 'Perasaan' },
  { sunda: 'Sedih', indonesia: 'Sedih', kategori: 'Perasaan' },
  { sunda: 'Hiji', indonesia: 'Satu', kategori: 'Angka' },
  { sunda: 'Dua', indonesia: 'Dua', kategori: 'Angka' },
  { sunda: 'Tilu', indonesia: 'Tiga', kategori: 'Angka' },
  { sunda: 'Opat', indonesia: 'Empat', kategori: 'Angka' },
  { sunda: 'Lima', indonesia: 'Lima', kategori: 'Angka' },
  { sunda: 'Genep', indonesia: 'Enam', kategori: 'Angka' },
  { sunda: 'Tujuh', indonesia: 'Tujuh', kategori: 'Angka' },
  { sunda: 'Dalapan', indonesia: 'Delapan', kategori: 'Angka' },
  { sunda: 'Salapan', indonesia: 'Sembilan', kategori: 'Angka' },
  { sunda: 'Sapuluh', indonesia: 'Sepuluh', kategori: 'Angka' },
  { sunda: 'Bodas', indonesia: 'Putih', kategori: 'Warna' },
  { sunda: 'Hideung', indonesia: 'Hitam', kategori: 'Warna' },
  { sunda: 'Beureum', indonesia: 'Merah', kategori: 'Warna' },
  { sunda: 'Konéng', indonesia: 'Kuning', kategori: 'Warna' },
  { sunda: 'Héjo', indonesia: 'Hijau', kategori: 'Warna' },
  { sunda: 'Bulao', indonesia: 'Biru', kategori: 'Warna' },
  { sunda: 'Ayeuna', indonesia: 'Sekarang', kategori: 'Waktu' },
  { sunda: 'Kamari', indonesia: 'Kemarin', kategori: 'Waktu' },
  { sunda: 'Isukan', indonesia: 'Besok', kategori: 'Waktu' },
  { sunda: 'Poe Senén', indonesia: 'Hari Senin', kategori: 'Waktu' },
];
const conversationData: ConversationCategory = {
  // ... data percakapan Anda tetap sama ...
  'Perkenalan': [
    { sunda: 'Wasta abdi [Nama]', indonesia: 'Nama saya [Nama]' },
    { sunda: 'Saha nami anjeun?', indonesia: 'Siapa nama kamu?' },
    { sunda: 'Abdi ti [Kota]', indonesia: 'Saya dari [Kota]' },
    { sunda: 'Anjeun ti mana?', indonesia: 'Kamu dari mana?' },
    { sunda: 'Resep tiasa tepang sareng anjeun', indonesia: 'Senang bertemu denganmu' },
  ],
  'Di Restoran': [
    { sunda: 'Abdi pesen nasi liwet hiji', indonesia: 'Saya pesan nasi liwet satu' },
    { sunda: 'Hoyong cai hérang', indonesia: 'Minta air putih' },
    { sunda: 'Sabaraha sadayana?', indonesia: 'Berapa semuanya?' },
    { sunda: 'Neda widi ka pengker heula', indonesia: 'Permisi ke toilet dulu' },
  ],
  'Menanyakan Arah': [
    { sunda: 'Punten, ari jalan ka Situ Bagendit ka mana?', indonesia: 'Permisi, kalau jalan ke Situ Bagendit ke mana?' },
    { sunda: 'Jauh kénéh?', indonesia: 'Masih jauh?' },
    { sunda: 'Hatur nuhun infona', indonesia: 'Terima kasih informasinya' },
    { sunda: 'Tiasa dianteur ka ditu?', indonesia: 'Bisa diantar ke sana?' },
  ],
  'Belanja': [
    { sunda: 'Sabaraha pangaosna ieu?', indonesia: 'Berapa harga ini?' },
    { sunda: 'Tiasa kirangan sakedik?', indonesia: 'Bisa kurangi sedikit?' },
    { sunda: 'Abdi nyandak nu ieu', indonesia: 'Saya ambil yang ini' },
    { sunda: 'Nampi artosna', indonesia: 'Terima uangnya' },
  ],
};


// === 🧩 Komponen Utama ===
const KamusSunda = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState("kamus");
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Logika lain tidak diubah
  const categories = useMemo(() => ['Semua', ...new Set(dictionaryData.map(item => item.kategori))], []);
  const filteredWords = useMemo(() => {
    return dictionaryData.filter(word => {
      const matchesCategory = selectedCategory === 'Semua' || word.kategori === selectedCategory;
      const matchesSearch =
        word.sunda.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.indonesia.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);
  const handlePlaySound = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'su-ID';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Fitur Tidak Didukung",
        description: "Browser Anda tidak mendukung fitur suara ini.",
      });
    }
  };

  // ====================================================================
  // [MODIFIKASI TOTAL] Tab: Kamus
  // ====================================================================
  const KamusTabContent = () => (
    <Box className="space-y-6">
      <TextField
        fullWidth
        placeholder={t('kamus.searchPlaceholder', 'Cari kata Sunda atau Indonesia...')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search className="h-5 w-5 text-gray-400" />
            </InputAdornment>
          ),
          sx: { borderRadius: '9999px', backgroundColor: 'white', height: '48px' }
        }}
      />

      {/* Filter untuk Desktop (Tombol-tombol dari component/ui) */}
      <Box className="hidden sm:flex flex-wrap my-5 items-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </Box>

      {/* Filter untuk Mobile (Dropdown/Select dari MUI) */}
      <Box className="sm:hidden my-5">
        <FormControl fullWidth variant="outlined">
          <InputLabel id="kategori-select-label">Kategori</InputLabel>
          <Select
            labelId="kategori-select-label"
            id="kategori-select"
            value={selectedCategory}
            label="Kategori"
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{ borderRadius: '0.5rem', backgroundColor: 'white' }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      {/* Hasil Pencarian (Grid) */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWords.length > 0 ? (
          filteredWords.map((word, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm"
            >
              <div>
                <p className="font-bold text-primary text-lg">{word.sunda}</p>
                <p className="text-gray-600">{word.indonesia}</p>
              </div>
              <IconButton onClick={() => handlePlaySound(word.sunda)} className="rounded-full">
                <Volume2 className="h-5 w-5 text-gray-500" />
              </IconButton>
            </motion.div>
          ))
        ) : (
          <Box className="text-center py-10 text-gray-500 col-span-full">
            <Typography variant="subtitle1" fontWeight="bold">{t('kamus.notFound')}</Typography>
            <Typography variant="body2">{t('kamus.notFoundHint')}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );

  // Tab: Percakapan (Tidak diubah)
  const PercakapanTabContent = () => (
    <Box className="w-full max-w-4xl mx-auto space-y-3">
       {Object.entries(conversationData).map(([title, phrases], index) => (
        <Accordion 
          key={index} 
          defaultExpanded={index === 0}
          sx={{
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem !important',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.05)',
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
            mb: '0.75rem !important'
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />}
            sx={{ '& .MuiAccordionSummary-content': { display: 'flex', alignItems: 'center', gap: '0.75rem' } }}
          >
            {title === 'Perkenalan' && <MessageSquare className="h-5 w-5 text-primary" />}
            {title === 'Di Restoran' && <Utensils className="h-5 w-5 text-primary" />}
            {title === 'Menanyakan Arah' && <MapPin className="h-5 w-5 text-primary" />}
            {title === 'Belanja' && <ShoppingCart className="h-5 w-5 text-primary" />}
            <Typography variant="h6" sx={{ fontWeight: 500, fontSize: '1.125rem' }}>{title}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2, pb: 2, backgroundColor: '#f9fafb' }}>
            <Box className="space-y-3 pt-2">
              {phrases.map((phrase, pIndex) => (
                <Box
                  key={pIndex}
                  className="flex items-center justify-between p-3 bg-white rounded-md border"
                >
                  <div>
                    <Typography variant="body1" className="font-medium text-primary">{phrase.sunda}</Typography>
                    <Typography variant="body2" className="text-sm text-gray-500 italic">{phrase.indonesia}</Typography>
                  </div>
                  <IconButton onClick={() => handlePlaySound(phrase.sunda)} className="rounded-full">
                    <Volume2 className="h-5 w-5 text-gray-500" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );

  // Tab: Tingkatan (Tidak diubah)
  const TingkatanTabContent = () => (
    <Box className="space-y-4 p-6 bg-white rounded-xl shadow-sm border max-w-4xl mx-auto">
      <Typography variant="h5" className="font-bold text-xl text-primary">{t('kamus.tingkatanTitle', 'Tingkatan Bahasa Sunda')}</Typography>
      <Typography>{t('kamus.tingkatanDesc', 'Bahasa Sunda memiliki tingkatan...')}</Typography>
      <Box className="space-y-4 pt-4 mt-4 border-t">
        <div>
          <Typography variant="h6" className="font-semibold text-lg text-gray-800">{t('kamus.lemesTitle', '1. Basa Lemes (Halus)')}</Typography>
          <Typography className="text-sm" dangerouslySetInnerHTML={{ __html: t('kamus.lemesDesc', 'Digunakan saat berbicara...') }}/>
        </div>
        <div>
          <Typography variant="h6" className="font-semibold text-lg text-gray-800">{t('kamus.lomaTitle', '2. Basa Loma (Wajar/Akran)')}</Typography>
          <Typography className="text-sm" dangerouslySetInnerHTML={{ __html: t('kamus.lomaDesc', 'Digunakan saat berbicara...') }}/>
        </div>
        <div>
          <Typography variant="h6" className="font-semibold text-lg text-gray-800">{t('kamus.kasarTitle', '3. Basa Kasar (Kasar)')}</Typography>
          <Typography className="text-sm" dangerouslySetInnerHTML={{ __html: t('kamus.kasarDesc', 'Biasanya digunakan saat marah...') }}/>
        </div>
      </Box>
    </Box>
  );

  return (
    <PageLayout>
      <Head>
        <title>{t('kamus.pageTitle', 'Kamus Basa Sunda')}</title>
        <meta name="description" content={t('kamus.pageDesc', 'Belajar Bahasa Sunda dengan mudah.')} />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        <section className="relative bg-blue-50/70 pt-24 pb-16 overflow-hidden">
          <div className="container relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-block p-4 mb-4 bg-primary text-white rounded-full shadow-lg">
                <BookOpen className="h-8 w-8" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
                {t('kamus.bannerTitle', 'Kamus Digital Basa Sunda')}
              </h1>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
                {t('kamus.bannerSubtitle', 'Diajar basa Sunda jadi leuwih gampang jeung pikaresepeun!')}
              </p>
            </motion.div>
          </div>
        </section>

        <main className="container section-padding -mt-8">
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                p: 0.5,
                borderRadius: '9999px',
                backgroundColor: '#f1f5f9',
                display: 'inline-flex',
                maxWidth: '100%',
                '& .MuiTabs-indicator': { display: 'none' },
              }}
            >
              <Tab
                value="kamus"
                label={<span className="flex items-center gap-2"><Mic className="h-4 w-4" />{t('kamus.tabKamus', 'Kamus')}</span>}
                sx={{
                  textTransform: 'none', fontWeight: 500, fontSize: '0.875rem',
                  borderRadius: '9999px',
                  color: activeTab === 'kamus' ? '#0f172a' : '#64748b',
                  backgroundColor: activeTab === 'kamus' ? 'white' : 'transparent',
                  boxShadow: activeTab === 'kamus' ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' : 'none',
                  transition: 'all 0.3s', py: 1, px: 3,
                  '&.Mui-selected': { color: '#0f172a' }
                }}
              />
              <Tab
                value="percakapan"
                label={<span className="flex items-center gap-2"><MessageSquare className="h-4 w-4" />{t('kamus.tabPercakapan', 'Percakapan')}</span>}
                sx={{
                  textTransform: 'none', fontWeight: 500, fontSize: '0.875rem',
                  borderRadius: '9999px',
                  color: activeTab === 'percakapan' ? '#0f172a' : '#64748b',
                  backgroundColor: activeTab === 'percakapan' ? 'white' : 'transparent',
                  boxShadow: activeTab === 'percakapan' ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' : 'none',
                  transition: 'all 0.3s', py: 1, px: 3,
                  '&.Mui-selected': { color: '#0f172a' }
                }}
              />
              <Tab
                value="tingkatan"
                label={<span className="flex items-center gap-2"><BarChart3 className="h-4 w-4" />{t('kamus.tabTingkatan', 'Tingkatan')}</span>}
                sx={{
                  textTransform: 'none', fontWeight: 500, fontSize: '0.875rem',
                  borderRadius: '9999px',
                  color: activeTab === 'tingkatan' ? '#0f172a' : '#64748b',
                  backgroundColor: activeTab === 'tingkatan' ? 'white' : 'transparent',
                  boxShadow: activeTab === 'tingkatan' ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' : 'none',
                  transition: 'all 0.3s', py: 1, px: 3,
                  '&.Mui-selected': { color: '#0f172a' }
                }}
              />
            </Tabs>
          </Box>

          <Box sx={{ mt: 6 }}>
            {activeTab === 'kamus' && <KamusTabContent />}
            {activeTab === 'percakapan' && <PercakapanTabContent />}
            {activeTab === 'tingkatan' && <TingkatanTabContent />}
          </Box>
        </main>
      </div>
    </PageLayout>
  );
};

export default KamusSunda;