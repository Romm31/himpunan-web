// src/components/NewsSlider.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BeritaType } from '@/types';

// Impor komponen Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

interface NewsSliderProps {
  berita: BeritaType[];
}

const NewsSlider: React.FC<NewsSliderProps> = ({ berita }) => {
  return (
    <section id="berita" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Berita Terbaru</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {berita.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden group h-full flex flex-col">
                <div className="relative w-full h-56">
                  {item.gambarUrl ? (
                    <Image src={item.gambarUrl} alt={item.judul} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">Gambar tidak tersedia</div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-xl mb-2 text-gray-800 flex-grow">{item.judul}</h3>
                  <p className="text-gray-600 text-base mb-4">
                    {item.konten ? item.konten.substring(0, 100) : ''}...
                  </p>
                  <Link href={`/berita/${item.id}`} className="font-semibold text-green-600 hover:text-green-800 transition-colors mt-auto">
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NewsSlider;