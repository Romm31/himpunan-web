// src/components/NewsSlider.tsx (Updated for Elegance & Emerald)
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BeritaType } from '@/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

interface NewsSliderProps {
  berita: BeritaType[];
}

const NewsSlider: React.FC<NewsSliderProps> = ({ berita }) => {
  return (
    <section id="berita" className="py-20 bg-gray-100 font-sans"> {/* Increased padding, lighter background */}
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-emerald-dark font-serif">Berita Terbaru</h2> {/* Stronger title */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1280: { slidesPerView: 4, spaceBetween: 30 }, // Tambahkan lebih banyak kolom untuk layar lebar
          }}
          className="pb-12" // Padding bawah untuk pagination dots
        >
          {berita.map((item) => (
            <SwiperSlide key={item.id}>
              <Link href={`/berita/${item.id}`} className="block"> {/* Make the whole card clickable */}
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-col transform hover:-translate-y-2">
                  <div className="relative w-full h-56 bg-gray-200 overflow-hidden">
                    {item.gambarUrl ? (
                      <Image
                        src={item.gambarUrl}
                        alt={item.judul}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        Gambar tidak tersedia
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl mb-3 text-gray-800 leading-tight group-hover:text-emerald-himp transition-colors flex-grow">
                      {item.judul}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3"> {/* Limit text to 3 lines */}
                      {item.konten ? item.konten : 'Tidak ada deskripsi tersedia.'}
                    </p>
                    <span className="font-semibold text-emerald-himp hover:text-emerald-dark transition-colors mt-auto flex items-center">
                      Baca Selengkapnya
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
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