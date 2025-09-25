// src/components/HeroSection.tsx
import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1-2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-5xl text-4xl mb-4 font-bold text-white">
            Selamat Datang di Website Himpunan
          </h1>
          <p className="mb-8 leading-relaxed text-gray-300">
            Wadah untuk memajukan kreativitas dalam pengembangan Linux dan Open Source.
          </p>
          <div className="flex justify-center">
            <a href="#berita" className="inline-flex text-white bg-green-600 border-0 py-3 px-8 focus:outline-none hover:bg-green-700 rounded-lg text-lg transition-colors">
              Lihat Berita Terbaru
            </a>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1-2 w-5/6">
          <Image
            className="object-cover object-center rounded"
            alt="Maskot Himpunan"
            width={720}
            height={600}
            src="/placeholder-mascot.png" 
          />
        </div>
      </div>
    </section>
  );
};
export default HeroSection;