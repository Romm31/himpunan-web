// src/components/NewsSlider.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BeritaType } from '@/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useInView } from 'react-intersection-observer';

interface NewsSliderProps {
  berita: BeritaType[];
}

const NewsSlider: React.FC<NewsSliderProps> = ({ berita }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="berita" ref={ref} className={`py-20 bg-gray-50 fade-in-section ${inView ? 'is-visible' : ''}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-dark font-heading tracking-tight">Berita Terbaru</h2>
          <div className="mt-4 w-24 h-1 bg-emerald-himp mx-auto rounded-full"></div>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="pb-12"
        >
          {berita.map((item) => (
            <SwiperSlide key={item.id}>
              <Link href={`/berita/${item.id}`} className="block h-full">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group h-full flex flex-col transform hover:-translate-y-2">
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
                    <span className="font-semibold text-emerald-himp mt-auto flex items-center">
                      Baca Selengkapnya
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
export default NewsSlider;