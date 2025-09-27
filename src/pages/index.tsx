// src/pages/index.tsx (Disesuaikan untuk HeroSlider Statis)
import type { GetServerSideProps, NextPage } from 'next';
import { BeritaType } from '@/types';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import NewsSlider from '@/components/NewsSlider';
import VisiMisiSection from '@/components/VisiMisiSection';
import AboutUsSection from '@/components/AboutUsSection';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider'; // Impor HeroSlider
import { About, VisiMisi } from '@prisma/client';

// Hapus 'slides' dari props
interface HomeProps {
  latestBerita: BeritaType[];
  visiMisi: VisiMisi | null;
  about: About | null;
}

const Home: NextPage<HomeProps> = ({ latestBerita, visiMisi, about }) => {
  return (
    <div>
      <Navbar />
      <main>
        {/* Panggil HeroSlider tanpa mengirim props */}
        <HeroSlider />
        <NewsSlider berita={latestBerita} />
        <VisiMisiSection data={visiMisi} />
        <AboutUsSection data={about} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  // Hanya ambil data untuk Berita, VisiMisi, dan About
  const [latestBerita, visiMisi, about] = await Promise.all([
    prisma.berita.findMany({ take: 8, orderBy: { createdAt: 'desc' } }),
    prisma.visiMisi.findFirst({ orderBy: { createdAt: 'desc' } }),
    prisma.about.findFirst(),
  ]);

  return {
    props: {
      latestBerita: JSON.parse(JSON.stringify(latestBerita)),
      visiMisi: JSON.parse(JSON.stringify(visiMisi)),
      about: JSON.parse(JSON.stringify(about)),
    },
  };
};