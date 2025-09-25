// src/components/Navbar.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Berita', href: '#berita' },
    { name: 'Visi & Misi', href: '#visi-misi' },
    { name: 'Tentang Kami', href: '#tentang' },
  ];

  return (
    <header className="bg-green-700 shadow-md sticky top-0 z-50 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Sisi Kiri: Branding */}
        <Link href="/" className="flex items-center space-x-3">
          {/* Ganti src dengan path logo Anda di folder /public */}
          <Image src="/logo-placeholder.svg" alt="Logo HIMPENAS" width={40} height={40} />
          <span className="font-bold text-xl tracking-wider">HIMPENAS</span>
        </Link>

        {/* Sisi Kanan: Navigasi Desktop */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-green-200 transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Tombol Hamburger untuk Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu Dropdown Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-700">
          <nav className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-green-200 transition-colors" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;