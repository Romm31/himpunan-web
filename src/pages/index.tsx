import type { GetServerSideProps, NextPage } from 'next';
import { BeritaType } from '@/types';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import NewsSlider from '@/components/NewsSlider';
import VisiMisiSection from '@/components/VisiMisiSection';
import AboutUsSection from '@/components/AboutUsSection';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import EventsSection from '@/components/EventsSection';
import ShapeDivider from '@/components/ShapeDivider'; // Impor komponen baru
import { About, Event, Slide, VisiMisi } from '@prisma/client';

interface HomeProps {
  slides: Slide[];
  latestBerita: BeritaType[];
  visiMisi: VisiMisi | null;
  about: About | null;
  events: Event[];
}

const Home: NextPage<HomeProps> = ({ slides, latestBerita, visiMisi, about, events }) => {
  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSlider slides={slides} />
        <ShapeDivider /> {/* Tambahkan Shape Divider di sini */}
        <NewsSlider berita={latestBerita} />
        <EventsSection events={events} />
        <VisiMisiSection data={visiMisi} />
        <AboutUsSection data={about} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const [slides, latestBerita, visiMisi, about, events] = await Promise.all([
    prisma.slide.findMany({ orderBy: { order: 'asc' } }),
    prisma.berita.findMany({ take: 8, orderBy: { createdAt: 'desc' } }),
    prisma.visiMisi.findFirst({ orderBy: { createdAt: 'desc' } }),
    prisma.about.findFirst(),
    prisma.event.findMany({ take: 3, orderBy: { tanggal: 'desc' } }),
  ]);

  return {
    props: {
      slides: JSON.parse(JSON.stringify(slides)),
      latestBerita: JSON.parse(JSON.stringify(latestBerita)),
      visiMisi: JSON.parse(JSON.stringify(visiMisi)),
      about: JSON.parse(JSON.stringify(about)),
      events: JSON.parse(JSON.stringify(events)),
    },
  };
};