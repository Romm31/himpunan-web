import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  query: { [key: string]: string | undefined };
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, basePath, query }) => {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (query.search) params.set('search', query.search);
    if (query.kategori) params.set('kategori', query.kategori);
    params.set('page', page.toString());
    return `${basePath}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center space-x-2 md:space-x-4 mt-16">
      {/* Tombol Sebelumnya */}
      <Link
        href={createPageUrl(currentPage - 1)}
        className={`px-3 py-1 md:px-4 md:py-2 border rounded-lg text-sm md:text-base transition-colors duration-200 ${
          currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-emerald-light hover:text-white border-gray-300'
        }`}
        aria-disabled={currentPage === 1}
      >
        Sebelumnya
      </Link>

      {/* Info Halaman */}
      <span className="font-semibold text-gray-600 text-sm md:text-base">
        Halaman {currentPage} dari {totalPages}
      </span>

      {/* Tombol Selanjutnya */}
      <Link
        href={createPageUrl(currentPage + 1)}
        className={`px-3 py-1 md:px-4 md:py-2 border rounded-lg text-sm md:text-base transition-colors duration-200 ${
          currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-emerald-light hover:text-white border-gray-300'
        }`}
        aria-disabled={currentPage === totalPages}
      >
        Selanjutnya
      </Link>
    </div>
  );
};

export default Pagination;