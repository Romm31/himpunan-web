import React from 'react';
import { Kategori } from '@prisma/client';

interface FilterControlsProps {
  kategoriList: Kategori[];
  currentSearch?: string;
  currentKategori?: string;
}

const FilterControls: React.FC<FilterControlsProps> = ({ kategoriList, currentSearch, currentKategori }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
      <form method="GET" action="/berita" className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        
        <div className="md:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Cari Berita
          </label>
          <input
            type="search"
            name="search"
            id="search"
            defaultValue={currentSearch}
            placeholder="Ketik judul atau kata kunci..."
            className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:ring-2 focus:ring-emerald-himp focus:border-transparent"
            autoComplete="off" // <-- TAMBAHKAN ATRIBUT INI
          />
        </div>

        <div>
          <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 mb-2">
            Filter Kategori
          </label>
          <select
            name="kategori"
            id="kategori"
            defaultValue={currentKategori}
            className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:ring-2 focus:ring-emerald-himp focus:border-transparent"
          >
            <option value="">Semua Kategori</option>
            {kategoriList.map((kategori) => (
              <option key={kategori.id} value={kategori.id}>
                {kategori.nama}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="md:col-start-3 bg-emerald-himp text-white font-bold py-3 px-5 rounded-lg hover:bg-emerald-light transition-colors w-full">
          Terapkan Filter
        </button>
      </form>
    </div>
  );
};

export default FilterControls;