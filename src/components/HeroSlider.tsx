// src/components/HeroSlider.tsx
import React from 'react';
import Image from 'next/image';
import { Slide } from '@prisma/client'; // Impor tipe Slide
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';

interface HeroSliderProps {
  slides: Slide[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
  // Jika tidak ada data dari DB, jangan tampilkan apa-apa atau tampilkan fallback
  if (!slides || slides.length === 0) {
    return (
      <div className="w-full h-[60vh] bg-gray-300 flex items-center justify-center">
        <p className="text-gray-500">Silakan tambahkan data slide di database.</p>
      </div>
    );
  }

  return (
    <section className="w-full h-[60vh]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                layout="fill"
                objectFit="cover"
                priority
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h1 className="text-white text-4xl md:text-6xl font-bold text-center drop-shadow-lg p-4">
                  {slide.title}
                </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;