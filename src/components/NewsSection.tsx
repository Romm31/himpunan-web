// src/components/NewsSection.tsx
import Link from 'next/link';
import React from 'react';
import { BeritaType } from '@/types';
import Image from 'next/image';

interface NewsSectionProps {
  berita: BeritaType[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ berita }) => {
  return (
    <section id="berita" className="bg-white body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-bold title-font text-gray-900">Berita & Informasi Terbaru</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {berita.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="relative w-full h-48">
                {item.gambarUrl ? (
                  <Image
                    src={item.gambarUrl}
                    alt={item.judul}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200"></div>
                )}
              </div>
              <div className="p-6">
                <h3 className="title-font text-lg font-bold text-gray-900 mb-3">{item.judul}</h3>
                <p className="leading-relaxed mb-3 text-gray-600">
                  {item.konten ? item.konten.substring(0, 100) : ''}...
                </p>
                <div className="flex items-center flex-wrap">
                  <Link href={`/berita/${item.id}`} className="text-green-700 inline-flex items-center md:mb-2 lg:mb-0 hover:underline">
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default NewsSection;