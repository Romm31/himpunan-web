// src/components/VisiMisiSection.tsx
import React from 'react';

const VisiMisiSection: React.FC = () => {
  return (
    <section id="visi-misi" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Visi & Misi</h2>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <h3 className="text-2xl font-semibold mb-4 text-green-700">Visi</h3>
            <p className="text-gray-600 leading-relaxed">
              Menjadi pusat unggulan dalam pengembangan kreativitas dan inovasi di bidang teknologi informasi yang berbasis open source.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <h3 className="text-2xl font-semibold mb-4 text-green-700">Misi</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Menyelenggarakan pelatihan dan workshop rutin.</li>
              <li>Mendorong kolaborasi dalam proyek-proyek open source.</li>
              <li>Membangun komunitas yang solid dan suportif.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisiSection;