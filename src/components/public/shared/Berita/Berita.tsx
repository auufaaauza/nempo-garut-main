"use client";

import React from 'react';
import Head from 'next/head';
import { Newspaper, Hourglass, Sparkles } from 'lucide-react';
import PageBanner from '@/components/public/common/PageBanner';
import PageLayout from '@/components/public/common/AnimatedPageLayout';
import { useTranslation } from 'react-i18next';

const Berita = () => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <Head>
        <title>{t('berita.pageTitle')}</title>
        <meta name="description" content={t('berita.pageDesc')} />
        <meta property="og:title" content={t('berita.pageTitle')} />
        <meta property="og:description" content={t('berita.pageDesc')} />
      </Head>

      <PageBanner
        icon={Newspaper}
        title={t('berita.bannerTitle')}
        subtitle={t('berita.bannerSubtitle')}
        decor1={Sparkles}
        decor2={Hourglass}
      />

      <div className="container section-padding text-center">
        <h2 className="text-2xl font-bold text-gray-800">{t('berita.comingSoon')}</h2>
        <p className="text-gray-600 mt-2">{t('berita.comingSoonDesc')}</p>
      </div>
    </PageLayout>
  );
};

export default Berita;