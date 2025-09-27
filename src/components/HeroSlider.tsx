// src/components/HeroSlider.tsx
import React from 'react';
import Image from 'next/image';
import { Slide } from '@prisma/client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'; // Hapus 'Navigation'
import 'swiper/css/effect-fade';

interface HeroSliderProps {
  slides: Slide[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
  // ... (logika defaultSlides tetap sama) ...
  const defaultSlides: Slide[] = [
    { id: 1, title: 'Selamat Datang di HIMPENAS', imageUrl: '/slide/slide1.png', order: 1, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, title: 'Inovasi Teknologi Open Source', imageUrl: '/slide/slide2.png', order: 2, createdAt: new Date(), updatedAt: new Date() },
  ];
  const slidesToRender = slides.length > 0 ? slides : defaultSlides;

  return (
    <section className="w-full h-[70vh] relative overflow-hidden bg-gray-900">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]} // Hapus 'Navigation'
        effect="fade"
        slidesPerView={1}
        pagination={{ clickable: true }} // Andalkan pagination
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {slidesToRender.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image src={slide.imageUrl} alt={slide.title} layout="fill" objectFit="cover" priority className="brightness-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-center p-8 text-center">
                <h1 className="text-white text-5xl md:text-7xl font-bold font-heading leading-tight drop-shadow-md">{slide.title}</h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;