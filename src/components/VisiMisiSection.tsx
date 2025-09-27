// src/components/VisiMisiSection.tsx
import React from 'react';
import { VisiMisi } from '@prisma/client';
import { useInView } from 'react-intersection-observer';

interface VisiMisiProps {
  data: VisiMisi | null;
}

const VisiMisiSection: React.FC<VisiMisiProps> = ({ data }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  if (!data) return null;

  return (
    <section id="visi-misi" ref={ref} className={`py-20 bg-gray-50 fade-in-section ${inView ? 'is-visible' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-dark font-heading tracking-tight">Visi & Misi</h2>
          <div className="mt-4 w-24 h-1 bg-emerald-himp mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-emerald-himp">
            <h3 className="text-3xl font-semibold mb-6 text-emerald-himp font-heading flex items-center">Visi</h3>
            <p className="text-gray-700 leading-relaxed text-lg">{data.visi}</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-emerald-himp">
            <h3 className="text-3xl font-semibold mb-6 text-emerald-himp font-heading flex items-center">Misi</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">{data.misi}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default VisiMisiSection;