"use client";

import React from 'react';
import Head from 'next/head';
import InfluencerGrid from './page/grid';
import CollaborationCTA from './page/collaboration';
import PageBanner from '@/components/public/common/PageBanner';
import { Users, Star, Camera } from 'lucide-react';
import PageLayout from '@/components/public/common/AnimatedPageLayout';
import { useTranslation } from 'react-i18next';

const InfluencerPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <Head>
        <title>{t('influencer.pageTitle')}</title>
        <meta name="description" content={t('influencer.pageDesc')} />
        <meta property="og:title" content={t('influencer.pageTitle')} />
        <meta property="og:description" content={t('influencer.pageDesc')} />
      </Head>

      <div className="bg-gray-50">
        <PageBanner
          icon={Users}
          title={t('Manajemen Influencer')}
          subtitle={t('Berkolaborasi dengan talenta terbaik di bawah naungan Nempo Garut.')}
          decor1={Star}
          decor2={Camera}
        />

        <section className="section-padding flex justify-center">
          <div className="container">
            <div className="text-center my-12">
              <h2 className="section-h2 font-bold text-gray-900">
                {t('Influencer Kami')}
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
                {t('Daftar talenta yang siap membantu brand Anda tumbuh dan menjangkau audiens yang lebih luas.')}
              </p>
            </div>
            <InfluencerGrid />
          </div>
        </section>
        <CollaborationCTA />
      </div>
    </PageLayout>
  );
};

export default InfluencerPage;