import { getCulinaryById, getCulinaries } from '@/lib/data';
import KulinerDetailClient from '@/components/public/shared/Kuliner/KulinerDetailClient';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Pre-generate params untuk SSG
export async function generateStaticParams() {
  const culinaries = await getCulinaries();
  return culinaries.map((culinary) => ({
    id: culinary.id.toString(),
  }));
}

// Metadata dinamis
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params; // ✅ harus await
  const culinary = await getCulinaryById(id);

  if (!culinary) {
    return { title: 'Kuliner Tidak Ditemukan' };
  }

  return {
    title: `${culinary.name} - Kuliner Khas Garut`,
    description: `Nikmati ${culinary.name}, salah satu kuliner terbaik di ${culinary.address}.`,
  };
}

// Halaman detail
export default async function KulinerDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ harus await
  const culinary = await getCulinaryById(id);

  if (!culinary) {
    notFound();
  }

  return <KulinerDetailClient culinary={culinary} />;
}
