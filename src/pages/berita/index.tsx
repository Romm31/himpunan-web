import { GetServerSideProps, NextPage } from 'next';
import { BeritaType } from '@/types';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { Kategori } from '@prisma/client';
import FilterControls from '@/components/FilterControls';
import Pagination from '@/components/Pagination';

interface BeritaPageProps {
  berita: BeritaType[];
  kategoriList: Kategori[];
  totalBerita: number;
  currentPage: number;
  totalPages: number;
  currentSearch?: string;
  currentKategori?: string;
}

const BeritaPage: NextPage<BeritaPageProps> = ({
  berita,
  kategoriList,
  totalBerita,
  currentPage,
  totalPages,
  currentSearch,
  currentKategori,
}) => {
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
        {/* PERUBAHAN DI SINI: Ganti path gambar */}
        <Image
          src="/header/berita-header.jpeg" // Ganti dengan path gambar baru Anda
          layout="fill"
          objectFit="cover"
          alt="Arsip Berita Himpunan"
          className="opacity-20"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white font-heading tracking-wider drop-shadow-lg">
            Arsip Berita
          </h1>
        </div>
      </header>

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <FilterControls
            kategoriList={kategoriList}
            currentSearch={currentSearch}
            currentKategori={currentKategori}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {berita.length > 0 ? (
              berita.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col card-hover-effect">
                  <div className="relative w-full h-56 bg-gray-200 overflow-hidden">
                    {item.gambarUrl ? (
                      <Image src={item.gambarUrl} alt={item.judul} layout="fill" objectFit="cover" className="transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Gambar tidak tersedia</div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl mb-3 text-gray-800 leading-tight group-hover:text-emerald-himp transition-colors flex-grow">{item.judul}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.konten || 'Tidak ada deskripsi.'}</p>
                    <Link href={`/berita/${item.id}`} className="font-semibold text-emerald-himp mt-auto flex items-center group">
                      Baca Selengkapnya
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-lg shadow-md">
                <p className="text-gray-500 text-2xl font-semibold">Berita tidak ditemukan</p>
                <p className="text-gray-400 mt-2">Coba gunakan kata kunci atau filter yang berbeda.</p>
              </div>
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/berita"
            query={{ search: currentSearch, kategori: currentKategori }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BeritaPage;

// getServerSideProps tidak perlu diubah
export const getServerSideProps: GetServerSideProps = async (context) => {
  const pageSize = 6;
  const page = parseInt(context.query.page as string) || 1;
  const search = context.query.search as string | undefined;
  const kategori = context.query.kategori as string | undefined;

  const whereClause: any = {};
  if (search) {
    whereClause.OR = [
      { judul: { contains: search, mode: 'insensitive' } },
      { konten: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (kategori && !isNaN(parseInt(kategori))) {
    whereClause.kategoriId = parseInt(kategori);
  }
  
  const [berita, totalBerita, kategoriList] = await Promise.all([
    prisma.berita.findMany({
      where: whereClause,
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.berita.count({ where: whereClause }),
    prisma.kategori.findMany({ orderBy: { nama: 'asc' } }),
  ]);

  const totalPages = Math.ceil(totalBerita / pageSize);

  return {
    props: {
      berita: JSON.parse(JSON.stringify(berita)),
      kategoriList: JSON.parse(JSON.stringify(kategoriList)),
      totalBerita,
      currentPage: page,
      totalPages,
      currentSearch: search || null,
      currentKategori: kategori || null,
    },
  };
};