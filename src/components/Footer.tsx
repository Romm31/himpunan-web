// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Kolom 1: Branding */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">HIMPENAS</h3>
            <p>Wadah kreativitas mahasiswa dalam bidang teknologi open source.</p>
          </div>
          {/* Kolom 2: Navigasi */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li><Link href="#berita" className="hover:text-white">Berita</Link></li>
              <li><Link href="#visi-misi" className="hover:text-white">Visi & Misi</Link></li>
              <li><Link href="#tentang" className="hover:text-white">Tentang Kami</Link></li>
            </ul>
          </div>
          {/* Kolom 3: Kontak */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Kontak</h3>
            <p>Email: info@himpenas.org</p>
            <p>Alamat: Gedung A, Kampus Kita</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-6 text-center">
          <p>© {new Date().getFullYear()} HIMPENAS. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;