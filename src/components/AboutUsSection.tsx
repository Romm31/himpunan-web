import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { About } from '@prisma/client';
import { useInView } from 'react-intersection-observer';

interface AboutUsProps {
  data: About | null;
}

const AboutUsSection: React.FC<AboutUsProps> = ({ data }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  if (!data) return null;

  return (
    <section
      id="tentang"
      ref={ref}
      className={`py-20 bg-white fade-in-section ${inView ? 'is-visible' : ''}`}
    >
      <div className="container mx-auto px-4">
        {/* Judul Tengah */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-heading tracking-tight text-emerald-himp">
            Tentang Kami
          </h2>
          <div className="mt-2 w-20 h-1 bg-emerald-himp rounded-full mx-auto"></div>
        </div>

        <div className="flex flex-wrap items-center">
          {/* Gambar */}
          <div className="w-full md:w-1/2 p-4">
            <Image
              src="/about/about.jpeg"
              alt="Tentang Kami HIMPENAS"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl object-cover"
            />
          </div>

          {/* Konten */}
          <div className="w-full md:w-1/2 p-4 md:pl-12">
            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              {data.profile}
            </p>
            <Link
              href="/tentang"
              className="inline-flex items-center bg-emerald-himp text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-light transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
