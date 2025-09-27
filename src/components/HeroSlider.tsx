// src/components/HeroSlider.tsx (Versi Statis/Manual)
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';

// Komponen ini tidak lagi menerima props
const HeroSlider: React.FC = () => {
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
        {/* Slide 1 - Didefinisikan Manual */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <Image
              src="/slide/slide1.png" // Path gambar langsung
              alt="Selamat Datang di HIMPENAS"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h1 className="text-white text-4xl md:text-6xl font-bold text-center drop-shadow-lg p-4">
                Selamat Datang di HIMPENAS
              </h1>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 - Didefinisikan Manual */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <Image
              src="/slide/slide2.png" // Path gambar langsung
              alt="Inovasi Teknologi Open Source"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h1 className="text-white text-4xl md:text-6xl font-bold text-center drop-shadow-lg p-4">
                Inovasi Teknologi Open Source
              </h1>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default HeroSlider;