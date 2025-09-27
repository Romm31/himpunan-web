import { GetServerSideProps, NextPage } from 'next';
import { BeritaType } from '@/types';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

interface BeritaPageProps {
  berita: BeritaType[];
}

const BeritaPage: NextPage<BeritaPageProps> = ({ berita }) => {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <header
        ref={headerRef}
        className={`relative h-64 bg-emerald-dark fade-in-section ${
          headerInView ? 'is-visible' : ''
        }`}
      >
        <Image
          src="/about/about.jpeg" // Gunakan gambar generik atau ganti nanti
          layout="fill"
          objectFit="cover"
          alt="Berita Himpunan"
          className="opacity-20"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white font-heading tracking-wider drop-shadow-lg">
            Berita Himpunan
          </h1>
        </div>
      </header>

      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {berita.length > 0 ? (
              berita.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col card-hover-effect">
                  <div className="relative w-full h-56 bg-gray-200 overflow-hidden">
                    {item.gambarUrl ? (
                      <Image src={item.gambarUrl} alt={item.judul} layout="fill" objectFit="cover" className="transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">Gambar tidak tersedia</div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl mb-3 text-gray-800 leading-tight group-hover:text-emerald-himp transition-colors flex-grow">{item.judul}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.konten || 'Tidak ada deskripsi.'}</p>
                    <Link href={`/berita/${item.id}`} className="font-semibold text-emerald-himp mt-auto flex items-center">
                      Baca Selengkapnya
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">Belum ada berita yang tersedia.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BeritaPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const berita = await prisma.berita.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return {
    props: {
      berita: JSON.parse(JSON.stringify(berita)),
    },
  };
};