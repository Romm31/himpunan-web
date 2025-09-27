// src/components/VisiMisiSection.tsx (Updated for Elegance & Emerald)
import React from 'react';
import { VisiMisi } from '@prisma/client';

interface VisiMisiProps {
  data: VisiMisi | null;
}

const VisiMisiSection: React.FC<VisiMisiProps> = ({ data }) => {
  if (!data || (!data.visi && !data.misi)) return null; // Hanya tampilkan jika ada konten

  const misiItems = data.misi ? data.misi.split('\n').filter(item => item.trim() !== '') : [];

  return (
    <section id="visi-misi" className="py-20 bg-white font-sans">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-emerald-dark font-serif">Visi & Misi Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-50 p-8 rounded-xl shadow-md border-t-4 border-emerald-himp">
            <h3 className="text-3xl font-semibold mb-6 text-emerald-himp font-serif flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-4 text-emerald-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.279A8.958 8.958 0 0112 3a8.998 8.998 0 019 9c0 1.57-.463 3.037-1.258 4.279M14.25 18H5.75A2.75 2.75 0 013 15.25V8.75A2.75 2.75 0 015.75 6H18.25A2.75 2.75 0 0121 8.75v6.5A2.75 2.75 0 0118.25 18h-4.004z" />
              </svg>
              Visi
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">{data.visi || 'Visi belum diatur.'}</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl shadow-md border-t-4 border-emerald-himp">
            <h3 className="text-3xl font-semibold mb-6 text-emerald-himp font-serif flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-4 text-emerald-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Misi
            </h3>
            {misiItems.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-700 leading-relaxed text-lg space-y-2">
                {misiItems.map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 leading-relaxed text-lg">Misi belum diatur.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default VisiMisiSection;