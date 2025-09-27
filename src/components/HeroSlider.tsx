import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Slide } from '@prisma/client';
import { BeritaType } from '@/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';

interface HeroSliderProps {
  slides: Slide[];
  berita: BeritaType[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides, berita }) => {
  const combinedSlides = [
    ...slides.map(slide => ({
      id: `slide-${slide.id}`,
      title: slide.title,
      imageUrl: slide.imageUrl,
      href: '/',
    })),
    ...berita
      .filter(item => item.gambarUrl)
      .map(item => ({
        id: `berita-${item.id}`,
        title: item.judul,
        imageUrl: item.gambarUrl!,
        href: `/berita/${item.id}`,
      })),
  ];

  if (combinedSlides.length === 0) {
    return (
      <div className="w-full h-[70vh] bg-gray-300 flex items-center justify-center">
        <p className="text-gray-500">Tidak ada slide untuk ditampilkan.</p>
      </div>
    );
  }

  return (
    <section className="w-full h-[70vh] relative overflow-hidden bg-gray-900">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {combinedSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link href={slide.href} className="block w-full h-full relative group">
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                layout="fill"
                objectFit="cover"
                priority={slide.id.startsWith('slide-')}
                className="brightness-75 group-hover:brightness-50 transition-all duration-300"
              />

              {/* PERUBAHAN DI SINI: Judul hanya tampil jika ID diawali 'slide-' */}
              {slide.id.startsWith('slide-') && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-center p-8 text-center">
                  <h1 className="text-white text-4xl md:text-6xl font-bold font-heading leading-tight drop-shadow-md">
                    {slide.title}
                  </h1>
                </div>
              )}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;