"use client";

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Users, Briefcase, TrendingUp, Sparkles, Code, Paintbrush, ArrowRight } from 'lucide-react'; // [BARU] Tambah ArrowRight
// import JoinCommunityForm from './JoinKomunitas'; // [DIHAPUS] Komponen form tidak digunakan lagi
import PageBanner from '@/components/public/common/PageBanner';
import PageLayout from '@/components/public/common/AnimatedPageLayout';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button'; // [BARU] Import Button dari Material-UI

// === 🔤 Tipe untuk benefit komunitas ===
interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const Komunitas = () => {
  const { t } = useTranslation();

  // Data benefit dengan terjemahan
  const benefits: Benefit[] = [
    {
      icon: Briefcase,
      title: t('Pengalaman Kerja Nyata'),
      description: t('Terlibat langsung dalam proyek kreatif  yang akan menjadi portofolio berharga untuk karir masa depan Anda.'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      title: t('Pengembangan Potensi & Karir'),
      description: t('Dapatkan bimbingan dari para profesional, ikuti workshop eksklusif, dan percepat jenjang karir Anda di industri kreatif.'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Sparkles,
      title: t('Lingkungan Kolaboratif'),
      description: t('Bergabunglah dengan lingkungan yang suportif, dimana Anda bisa berkolaborasi , bertukar ide, dan tumbuh bersama talenta muda lainnya.'),
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <PageLayout>
      <Head>
        <title>{t('komunitas.pageTitle')}</title>
        <meta name="description" content={t('komunitas.pageDesc')} />
        <meta property="og:title" content={t('komunitas.pageTitle')} />
        <meta property="og:description" content={t('komunitas.pageDesc')} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Banner */}
        <PageBanner
          icon={Users}
          title={t('Jadi bagian dari Gerakan Kreatif Garut')}
          subtitle={t('Kami bukan sekedar komunitas, kami adalah tempat dimana potensi Anda bertemu dengan kesempatan tak terbatas.')}
          decor1={Code}
          decor2={Paintbrush}
        />

        {/* Section: Manfaat Bergabung */}
        <section className="section-padding flex justify-center sm:mb-20 pb-20 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="section-h2 pt-20 font-bold text-gray-900">{t('Mengapa Harus Bergabung?')}</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                {t('Kami membuka pintu bagi Anda untuk mendapatkan lebih dari sekadar teman baru.')}
              </p>
            </div>

            {/* Grid Manfaat */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-8 bg-gray-50 rounded-2xl card-hover"
                  >
                    <div
                      className={`w-20 h-20 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    >
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* [BARU] Tombol Aksi (Call to Action) diletakkan di sini */}
            <div className="text-center mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }} // Sedikit delay agar muncul setelah card
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  component="a"
                  href="https://nempocreative.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowRight />}
                  sx={{
                    borderRadius: '9999px',
                    px: { xs: 4, md: 6 },
                    py: 2,
                    fontWeight: 'bold',
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    textTransform: 'none',
                    background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                    boxShadow: '0 4px 20px 0 rgba(0, 118, 255, 0.35)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 30px 0 rgba(0, 118, 255, 0.45)',
                    },
                  }}
                >
                  Mulai Petualangan Kreatifmu
                </Button>
              </motion.div>
            </div>
            
          </div>
        </section>

        {/* [DIHAPUS] Form Bergabung tidak lagi ditampilkan di sini */}
        {/* <JoinCommunityForm /> */}
      </div>
    </PageLayout>
  );
};

export default Komunitas;