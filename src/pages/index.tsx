import type { GetServerSideProps, NextPage } from 'next';
import { BeritaType } from '@/types';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import NewsSlider from '@/components/NewsSlider';
import VisiMisiSection from '@/components/VisiMisiSection';
import AboutUsSection from '@/components/AboutUsSection';
import Footer from '@/components/Footer';

interface HomeProps {
  latestBerita: BeritaType[];
}

const Home: NextPage<HomeProps> = ({ latestBerita }) => {
  return (
    <div>
      <Navbar />
      <main>
        <NewsSlider berita={latestBerita} />
        <VisiMisiSection />
        <AboutUsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const latestBerita = await prisma.berita.findMany({
    take: 8,
    orderBy: { createdAt: 'desc' },
  });
  return {
    props: {
      latestBerita: JSON.parse(JSON.stringify(latestBerita)),
    },
  };
};