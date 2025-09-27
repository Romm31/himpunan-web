// src/components/AboutUsSection.tsx (Path gambar diperbarui)
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { About } from '@prisma/client';

interface AboutUsProps {
  data: About | null;
}

const AboutUsSection: React.FC<AboutUsProps> = ({ data }) => {
  if (!data) return null;
  return (
    <section id="tentang" className="py-16 bg-gray-50">
      <div className="container mx-auto flex flex-wrap items-center px-4">
        <div className="w-full md:w-1/2 p-4">
          {/* PERUBAHAN DI SINI: Menggunakan path gambar Anda */}
          <Image 
            src="/about/about.jpeg" 
            alt="Tentang Kami HIMPENAS" 
            width={600} 
            height={400} 
            className="rounded-lg shadow-lg" 
            objectFit="cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Tentang Kami</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{data.profile}</p>
          <Link href="/tentang" className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
            Pelajari Lebih Lanjut
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;