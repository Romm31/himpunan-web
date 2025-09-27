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
    <section id="tentang" ref={ref} className={`py-20 bg-white fade-in-section ${inView ? 'is-visible' : ''}`}>
      <div className="container mx-auto flex flex-wrap items-center px-4">
        <div className="w-full md:w-1/2 p-4">
          <Image src="/about/about.jpeg" alt="Tentang Kami HIMPENAS" width={600} height={400} className="rounded-xl shadow-2xl" objectFit="cover" />
        </div>
        <div className="w-full md:w-1/2 p-4 md:pl-12">
          <h2 className="text-4xl font-bold font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-himp to-emerald-dark mb-6">
            Tentang Kami
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-8">{data.profile}</p>
          <Link href="/tentang" className="inline-flex items-center bg-emerald-himp text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-light transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Pelajari Lebih Lanjut
          </Link>
        </div>
      </div>
    </section>
  );
}
export default AboutUsSection;